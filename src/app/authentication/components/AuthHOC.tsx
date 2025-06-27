import siteLinks from "@/lib/sitelinks";
import { useAuthStore } from "@/store/auth-store"
import { Navigate, Outlet } from "react-router-dom"

const AuthHOC = () => {

    const { user } = useAuthStore();

    if (user) {
        return <Navigate to={siteLinks.redirection.link} replace={true} />
    }


    return (
        <Outlet />
    )
}

export default AuthHOC
