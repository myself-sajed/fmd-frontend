import { checkToken } from "@/app/authentication/api/auth-api";
import { useEffect, useState } from "react";

const useCheckToken = () => {
  const [isTokenPresent, setIsTokenPresent] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuthToken = async () => {
      try {
        const res = await checkToken();
        const isSuccess = res.data?.status === "success";
        if (isSuccess && window.location.href === "/auth/login") {
          window.location.reload();
        }
        setIsTokenPresent(() => isSuccess);
      } catch {
        setIsTokenPresent(() => false);
      }
    };

    checkAuthToken();
  }, []);

  return isTokenPresent;
};

export default useCheckToken;
