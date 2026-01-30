import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// 1. Define the routes you want to be public
const isPublicRoute = createRouteMatcher([
  '/site',
  '/api/uploadthing'
]);

export default clerkMiddleware(async (auth, request) => {
  // 2. If the route is NOT public, protect it
  if (!isPublicRoute(request)) {
    const sessionAuth = await auth();
    if (!sessionAuth?.userId) {
      // Not authenticated, redirect to Clerk sign-in or return 401
      // Here, you can choose how you want to handle unauthorized access:
      return Response.redirect('/sign-in'); // or your sign-in route
    }
    // Authenticated, allow request to proceed
  }
  // Public route, allow request to proceed
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};