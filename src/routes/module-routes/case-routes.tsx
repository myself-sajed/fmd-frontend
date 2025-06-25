import SuspenseLoading from "@/components/custom/SuspenseLoading";
import { lazy, Suspense } from "react";
import { Outlet, type RouteObject } from "react-router-dom";
const Cases = lazy(() => import("@/app/cases/pages/Cases"));


const CaseRoutes = () => {
    return [
        {
            path: "cases",
            element: <Outlet />,
            children: [
                {
                    path: "",
                    element: <Suspense fallback={<SuspenseLoading />}>
                        <Cases />
                    </Suspense>,
                },
            ]
        }
    ] as RouteObject[]
}

export default CaseRoutes