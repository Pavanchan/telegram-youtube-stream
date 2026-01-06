"use client";

import React from "react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import { useAuth } from "@clerk/nextjs";

if(!process.env.NEXT_PUBLIC_CONVEX_URL){
    throw new Error("Missing NEXT_PUBLIC_CONVEX_URL in your .env file");
}

// Create Convex client using public URL
const convex = new ConvexReactClient(
  process.env.NEXT_PUBLIC_CONVEX_URL!
);


function ConvexClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      {children}
    </ConvexProviderWithClerk>
  );
}

export default ConvexClientProvider;
