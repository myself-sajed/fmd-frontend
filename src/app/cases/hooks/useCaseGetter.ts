import { useAuthStore } from "@/store/auth-store";
import { useQuery } from "@tanstack/react-query";
import { getAllCases } from "../api/case-api";
import type { ICase } from "../types/case-types";

const useCaseGetter = () => {
  const { user } = useAuthStore();

  const {
    data: cases,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["GET_ALL_TICKETS", user?._id],
    queryFn: () => getAllCases().then((res) => res?.data?.data as ICase[]),
    enabled: !!user,
    refetchOnWindowFocus: false,
  });

  return {
    cases: cases || [],
    isLoading,
    isError,
  };
};

export default useCaseGetter;
