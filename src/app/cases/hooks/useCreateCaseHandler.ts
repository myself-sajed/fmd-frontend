import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCase, deleteCase } from "../api/case-api";
import {
  FMD_CLIENT_QUERY_LOCAL_STORAGE_KEY,
  type ICase,
} from "../types/case-types";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import siteLinks from "@/lib/sitelinks";
import { useAuthStore } from "@/store/auth-store";

type Props = {
  onSuccess?: () => void;
};

const useCreateCaseHandler = ({ onSuccess }: Props) => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: createCaseMutate, isPending } = useMutation({
    mutationKey: ["CREATE_A_CASE", user?._id],
    mutationFn: (formData: Partial<ICase>) => {
      return createCase(formData);
    },
    onSuccess: (data) => {
      if (data?.data?.success) {
        toast.success("Case created successfully!");
        const createdCase = data?.data?.data as ICase;

        queryClient.invalidateQueries({
          queryKey: ["GET_ALL_TICKETS", user?._id],
        });

        localStorage.removeItem(FMD_CLIENT_QUERY_LOCAL_STORAGE_KEY);

        navigate(siteLinks.caseDetails(createdCase?._id).link);
      } else {
        toast.error("Failed to create a case");
      }
    },
    onError: () => {
      toast.error("Case creation failed...");
    },
  });

  const { mutate: deleteCaseMutate, isPending: isDeleting } = useMutation({
    mutationKey: ["CREATE_A_CASE", user?._id],
    mutationFn: (caseId: string) => {
      return deleteCase(caseId);
    },
    onSuccess: () => {
      toast.success("Case deleted successfully!");
      queryClient.invalidateQueries({
        queryKey: ["GET_ALL_TICKETS", user?._id],
      });
      onSuccess?.();
    },
    onError: () => {
      toast.error("Failed delete the case...");
    },
  });

  return {
    createCaseMutate,
    isPending,
    deleteCaseMutate,
    isDeleting,
  };
};

export default useCreateCaseHandler;
