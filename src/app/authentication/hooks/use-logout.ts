import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../api/auth-api";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth-store";
import { useNavigate } from "react-router-dom";
import siteLinks from "@/lib/sitelinks";

const useLogout = () => {
  const { setUser } = useAuthStore();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logoutMutate, isPending: isLoggingOut } = useMutation({
    mutationKey: ["LOGOUT_USER"],
    mutationFn: logout,
    onSuccess: async (data) => {
      if (data?.data?.status === "success") {
        toast.success("Logged out successfully");
        setUser(null); // Reset user state
        queryClient.clear(); // Clear all queries, not just "SELF"
        navigate(siteLinks.login.link);
      } else {
        toast.error("Failed to log out");
      }
    },
    onError: () => {
      toast.error("Failed to log out, try again...");
    },
  });

  return {
    logoutMutate,
    isLoggingOut,
  };
};

export default useLogout;
