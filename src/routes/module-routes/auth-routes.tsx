import SuspenseLoading from "@/components/custom/SuspenseLoading";
import siteLinks from "@/lib/sitelinks";
import { lazy, Suspense } from "react";
import { Outlet, type RouteObject } from "react-router-dom";
const Login = lazy(() => import("@/app/authentication/pages/Login"));
const Signup = lazy(() => import("@/app/authentication/pages/Signup"));


const AuthRoutes = () => {
    return [
        {
            path: "auth",
            element: <Outlet />,
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