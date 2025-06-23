import Cases from "@/app/cases/pages/Cases";
import Landing from "@/app/landing/pages/Landing";

const Routes = () => [
    {
        path: "/",
        element: <Landing />,
    },
    {
        path: "cases",
        element: <Cases />
    }
];

export default Routes
