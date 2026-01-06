"use client";

import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useCallback, useEffect, useState } from "react";
import streamClient from "@/lib/stream";
import { createToken } from "@/actions/createToken";

import LoadingSpinner from "@/components/LoadingSpinner";

type UserSyncWrapperProps = {
  children: React.ReactNode;
};

function UserSyncWrapper({ children }: UserSyncWrapperProps) {
  const { user, isLoaded: isUserLoaded } = useUser();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Convex mutation
  const createOrUpdateUser = useMutation(api.users.upsertUser);

  const syncUser=useCallback(async()=>{
    if (!user?.id) return;

    try{
        setIsLoading(true);
        setError(null);

        const tokenProvider=async()=>{
            if(!user?.id){
                throw new Error("User is not authenticated");
            }
            const token=await createToken(user.id);
            return token;
        }
        await createOrUpdateUser({
            userId:user.id,
            name:user.fullName ||
            user.firstName||
            user.emailAddresses[0]?.emailAddress||"Unknown User",
            email:user.emailAddresses[0].emailAddress||"",
            imageUrl:user.imageUrl||"",
        });
// 2. Connect user to Stream
await streamClient.connectUser(
  {
    id: user.id,
    name:
      user.fullName ||
      user.firstName ||
      user.emailAddresses[0]?.emailAddress ||
      "Unknown User",
    image: user.imageUrl || "",
  },
  tokenProvider
)


    } catch(err){
        console.error("Failed to sync user:",error);
        setError(err instanceof Error ?err.message:"Failed to sync user");
        setIsLoading(false);
    } finally{
        setIsLoading(false);
    }
  },[createOrUpdateUser,user]);

const disconnectUser = useCallback(async () => {
  try {
    await streamClient.disconnectUser();
  } catch (err) {
    console.error("Failed to disconnect user:", err);
  }
}, []);

useEffect(()=>{
if(!isUserLoaded) return;

if(user){
    syncUser();
}
else{
    disconnectUser();
    setIsLoading(false);
}

//clean Up code 
return()=>{
    if(user){
        disconnectUser();
    }

}
},[user,isUserLoaded,syncUser,disconnectUser])

  useEffect(() => {
    if (!isUserLoaded) return;

    const syncUser = async () => {
      try {
        if (!user) {
          setIsLoading(false);
          return;
        }

        await createOrUpdateUser({
          userId: user.id,
          name: user.fullName || "Anonymous",
          email: user.primaryEmailAddress?.emailAddress || "",
          imageUrl: user.imageUrl,
        });

        setIsLoading(false);
      } catch (err) {
        console.error("User sync error:", err);
        setError("Failed to sync user data.");
        setIsLoading(false);
      }
    };

    syncUser();
  }, [isUserLoaded, user, createOrUpdateUser]);

  /* ================= LOADING STATE ================= */
  if (!isUserLoaded || isLoading) {
    return (
      <LoadingSpinner
        size="lg"
        message={isUserLoaded ? "Syncing user data..." : "Loading..."}
        className="min-h-screen"
      />
    );
  }

  /* ================= ERROR STATE ================= */
  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <p className="text-red-500 text-lg font-semibold mb-2">
          Sync Error
        </p>
        <p className="text-muted-foreground max-w-md">
          {error}
        </p>
        <p className="text-sm text-muted-foreground mt-4">
          Please try restarting the app or contact support if the issue persists.
        </p>
      </div>
    );
  }

  /* ================= SUCCESS ================= */
  return <>{children}</>;
}

export default UserSyncWrapper;
