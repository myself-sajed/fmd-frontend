import UnauthorizedError from "@/components/custom/UnauthorizedError";
import { useAuthStore } from "@/store/auth-store";
import type { JSX } from "react";

interface ProtectedRouteProps {
    allowedRoles: string[];
    children: JSX.Element;
}


const ProtectedHOC = ({ allowedRoles, children }: ProtectedRouteProps) => {
    const { user } = useAuthStore()
    const userRole = user?.role

    if (!allowedRoles.includes(userRole!)) {
        return <UnauthorizedError />;
    }

    return children;
}

export default ProtectedHOC
