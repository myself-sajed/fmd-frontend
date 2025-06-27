import siteLinks from "@/lib/sitelinks"
import { useAuthStore } from "@/store/auth-store"
import { useEffect } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"

const Protected = () => {

    const { user } = useAuthStore()
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate(`${siteLinks.redirection.link}`, { replace: true })
        }
    }, [user, location, navigate])

    return (
        <div className="min-h-screen">
            <Outlet />
        </div>
    )
}

export default Protected
