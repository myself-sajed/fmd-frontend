import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getOneCase } from "../api/case-api";
import { useAuthStore } from "@/store/auth-store";
import type { ICase } from "../types/case-types";
import { toast } from "sonner"; // Optional notification lib
import { shouldShowError, shouldShowLoading } from "../types/case-utils";

export const useCaseDetails = () => {
  const { user } = useAuthStore();
  const { caseId } = useParams();
  const lastStatusRef = useRef<string | null>(null);

  const {
    data: caseDetails,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["GET_ONE_CASE", caseId],
    queryFn: () => getOneCase(caseId!).then((res) => res?.data?.data as ICase),
    enabled: !!user && !!caseId,
    refetchOnWindowFocus: false,
    refetchInterval: (data) => {
      const { isCaseBeingAnalysed } = shouldShowLoading(
        (data || {}) as unknown as ICase
      );
      return isCaseBeingAnalysed ? 2000 : false;
    },
  });

  const { isCaseBeingAnalysed, loadingMessage, loadingStatus } =
    shouldShowLoading(caseDetails || ({} as ICase));
  const { isCaseError, errorMessage } = shouldShowError(
    caseDetails || ({} as ICase)
  );

  // ✅ Optional: Notify when case analysis is complete
  useEffect(() => {
    const currentStatus = caseDetails?.status;

    if (
      lastStatusRef.current &&
      lastStatusRef.current !== currentStatus &&
      currentStatus !== loadingStatus // transitioned from loading to final
    ) {
      toast.success(`Case analysis completed. Status: ${currentStatus}`);
    }

    lastStatusRef.current = currentStatus || null;
  }, [caseDetails, loadingStatus]);

  return {
    caseDetails,
    isLoading,
    isError,
    refetch,
    isCaseBeingAnalysed,
    loadingMessage,
    loadingStatus,
    isCaseError,
    errorMessage,
  };
};
