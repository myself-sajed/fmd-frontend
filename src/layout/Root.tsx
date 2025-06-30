import { useQuery } from '@tanstack/react-query';
import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AxiosError } from 'axios';
import { self } from '@/app/authentication/api/auth-api';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/auth-store';
import { Toaster } from '@/components/ui/sonner';
import SuspenseLoading from '@/components/custom/SuspenseLoading';

const Root = () => {
    const { setUser, user } = useAuthStore();
    const { pathname } = useLocation();

    const { data: fetchedUser, isLoading } = useQuery({
        queryKey: ['SELF', user?._id],
        queryFn: async () => {
            try {
                return await self().then((data) => data?.data);
            } catch (err) {
                if (
                    err instanceof AxiosError &&
                    ((err.response?.data as Record<string, string>)?.error as unknown as Record<string, string>)?.name === "ForbiddenError"
                ) {
                    // Refresh the page if ForbiddenError
                    window.location.reload();
                }
                throw err; // Rethrow the error for React Query to handle
            }
        },
        retry: (failureCount: number, error) => {
            if (error instanceof AxiosError && (error.response?.status === 401 || error.response?.status === 400)) {
                return false; // No retries for 401 or 400 errors
            }
            return failureCount < 1; // Retry up to 1 times for other errors
        },
        refetchOnWindowFocus: false,
        enabled: !user
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        if (!user) {
            if (fetchedUser) {
                setUser(fetchedUser)
            }
        }
    }, [user, fetchedUser, setUser])

    if (isLoading && !user) {
        return <SuspenseLoading />;
    }

    return (
        <div className={cn("min-h-screen")}>
            <Outlet />
            <Toaster richColors={true} position="bottom-right" />
        </div>
    );
};

export default Root;
