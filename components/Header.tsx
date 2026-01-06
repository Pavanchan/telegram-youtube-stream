"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SignInButton, UserButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <header className="flex items-center justify-between px-4 h-15 sm:px-6 border-b">
      <Link href="/dashboard" className="font-medium uppercase tracking-widest">
        Beam
      </Link>

      <div className="flex items-center gap-2">
        <Authenticated>
          {!isDashboard && (
            <Link href="/dashboard">
              <Button variant="outline">Dashboard</Button>
            </Link>
          )}
          <UserButton />
        </Authenticated>

        <Unauthenticated>
          <SignInButton
            mode="modal"
            forceRedirectUrl="/dashboard"
            signUpForceRedirectUrl="/dashboard"
          >
            <Button variant="outline">Sign In</Button>
          </SignInButton>
        </Unauthenticated>
      </div>
    </header>
  );
}
