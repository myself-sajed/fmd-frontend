import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCase } from "../api/case-api";
import {
  FMD_CLIENT_QUERY_LOCAL_STORAGE_KEY,
  type ICase,
} from "../types/case-types";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import siteLinks from "@/lib/sitelinks";
import { useAuthStore } from "@/store/auth-store";

const useCreateCaseHandler = () => {
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

  return {
    createCaseMutate,
    isPending,
  };
};

export default useCreateCaseHandler;
