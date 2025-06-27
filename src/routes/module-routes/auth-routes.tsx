import SuspenseLoading from "@/components/custom/SuspenseLoading";
import siteLinks from "@/lib/sitelinks";
import { lazy, Suspense } from "react";
import { type RouteObject } from "react-router-dom";
const Login = lazy(() => import("@/app/authentication/pages/Login"));
const Signup = lazy(() => import("@/app/authentication/pages/Signup"));
const AuthHOC = lazy(() => import("@/app/authentication/components/AuthHOC"));


const AuthRoutes = () => {
    return [
        {
            path: "auth",
            element: <Suspense fallback={<SuspenseLoading />}>
                <AuthHOC />
            </Suspense>,
            children: [
                {
                    path: siteLinks.login.routeLink,
                    element: <Suspense fallback={<SuspenseLoading />}>
                        <Login />
                    </Suspense>,
                },
                {
                    path: siteLinks.signup.routeLink,
                    element: <Suspense fallback={<SuspenseLoading />}>
                        <Signup />
                    </Suspense>,
                },
            ]
        }
    ] as RouteObject[]
}

export default AuthRoutes