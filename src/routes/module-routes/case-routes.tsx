import SuspenseLoading from "@/components/custom/SuspenseLoading";
import siteLinks from "@/lib/sitelinks";
import { lazy, Suspense } from "react";
import { Outlet, type RouteObject } from "react-router-dom";
const Cases = lazy(() => import("@/app/cases/pages/Cases"));
const CaseDetails = lazy(() => import("@/app/cases/pages/CaseDetails"));


const CaseRoutes = () => {
    return [
        {
            path: siteLinks.cases.routeLink,
            element: <Outlet />,
            children: [
                {
                    path: "",
                    element: <Suspense fallback={<SuspenseLoading />}>
                        <Cases />
                    </Suspense>,
                    children: [
                        {
                            path: siteLinks.caseDetails().routeLink,
                            element: <Suspense fallback={<SuspenseLoading />}>
                                <CaseDetails />
                            </Suspense>,
                        }
                    ]
                },
            ]
        }
    ] as RouteObject[]
}

export default CaseRoutes