import { clerkMiddleware ,createRouteMatcher} from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  '/',
  '/about(.*)',
  '/sign-in(.*)',
  '/sign-up(.*)',
  // Add other public routes here
])

export default clerkMiddleware(async (auth, req) => {
  // Skip auth check if using dummy keys (CI environment)
  if (process.env.CLERK_SECRET_KEY === 'dummy') {
    return;
  }
  
  if (!isPublicRoute(req)) {
    await auth.protect()
  }
})
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};