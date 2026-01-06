import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Protect all dashboard routes
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)"
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

// Required for Next.js App Router
export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
