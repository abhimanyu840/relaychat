import { convexAuthNextjsMiddleware, createRouteMatcher, nextjsMiddlewareRedirect } from "@convex-dev/auth/nextjs/server";

const isPublicPage = createRouteMatcher(['/login', '/signup']);

export default convexAuthNextjsMiddleware((req, { convexAuth }) => {
    if (!isPublicPage(req) && !convexAuth.isAuthenticated()) {
        return nextjsMiddlewareRedirect(req, '/login')
    }

    if (isPublicPage(req) && convexAuth.isAuthenticated()) {
        return nextjsMiddlewareRedirect(req, '/')
    }

});

// export default convexAuthNextjsMiddleware();

export const config = {
    // The following matcher runs middleware on all routes
    // except static assets.
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};