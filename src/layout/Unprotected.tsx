import { Navigate, useLocation } from "react-router-dom";
import { useRef, useEffect, useMemo } from "react";
import { useAuthStore } from "@/store/auth-store";
import { UserRolesEnum } from "@/app/authentication/types/user-roles";
import siteLinks from "@/lib/sitelinks";

const Unprotected = () => {
    const { user } = useAuthStore();
    const location = useLocation();
    const returnTo = new URLSearchParams(location.search).get("returnTo");

    const DEFAULT_PAGE_FOR_USERS = useMemo(() => {
        return {
            [UserRolesEnum.CLIENT]: siteLinks.cases.link,
        } as {
            [key: string]: string;
        }
    }, [])

    const defaultPage = DEFAULT_PAGE_FOR_USERS[user?.role as string] || siteLinks.pageNotFound.link;
    const prevRoleRef = useRef<string | null>(sessionStorage.getItem("prevRole"));

    useEffect(() => {
        if (user) {
            const currentRole = user.role;
            if (prevRoleRef.current !== currentRole) {
                prevRoleRef.current = currentRole;
                sessionStorage.setItem("prevRole", currentRole);
            }
        }
    }, [user]);

    const roleHasChanged = prevRoleRef.current !== user?.role;
    const returnURL = roleHasChanged
        ? defaultPage
        : returnTo && returnTo !== "/" && returnTo !== ""
            ? returnTo
            : defaultPage;


    if (user) {
        return <Navigate to={returnURL} replace={true} />;
    }

};

export default Unprotected;
