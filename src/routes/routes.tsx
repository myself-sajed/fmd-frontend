import SuspenseLoading from "@/components/custom/SuspenseLoading";
import Protected from "@/layout/Protected";
import { lazy, Suspense } from "react";
import AuthRoutes from "./module-routes/auth-routes";
import ErrorElement from "@/components/custom/ErrorElement";
import Landing from "@/app/landing/pages/Landing";
import CaseRoutes from "./module-routes/case-routes";

const Root = lazy(() => import("@/layout/Root"));
const ProtectedWithSidebar = lazy(() => import("@/layout/Protected"));
const Unprotected = lazy(() => import("@/layout/Unprotected"));

const Routes = () => [
    {
        path: "/",
        element: (
            <Suspense fallback={<SuspenseLoading />}>
                <Root />
            </Suspense>
        ),
        errorElement: <ErrorElement />,
        children: [
            // UNIVERSAL
            {
                path: "",
                element: <Landing />
            },
            // PROTECTED
            {
                path: "",
                element: (
                    <Suspense fallback={<SuspenseLoading />}>
                        <Protected />
                    </Suspense>
                ),
                children: [
                    {
                        path: "",
                        element: (
                            <Suspense fallback={<SuspenseLoading />}>
                                <ProtectedWithSidebar />
                            </Suspense>
                        ),
                        children: [
                            ...CaseRoutes()
                        ],
                    },
                ],
            },

            // UNPROTECTED
            {
                path: "",
                element: (
                    <Suspense fallback={<SuspenseLoading />}>
                        <Unprotected />
                    </Suspense>
                ),
                children: [
                    ...AuthRoutes()
                ]
            }
        ],
    },
];

export default Routes
