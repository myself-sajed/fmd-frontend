import { useState } from "react";
import type { ISignupForm } from "../types/auth-types";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { createAccount } from "../api/auth-api";
import type { AxiosError } from "@/http/client";
import { useAuthStore } from "@/store/auth-store";
import { titleSetter } from "@/lib/title";

const useSignupHandler = () => {
  titleSetter("Create an account");
  const { setUser } = useAuthStore();
  const [step, setStep] = useState<1 | 2>(1);
  const [isPasswordStrong, setIsPasswordStrong] = useState(false);

  const [formData, setFormData] = useState<ISignupForm>({
    name: "Shaikh Sajed",
    email: "sajed@gmail.com",
    password: "Sajed@123",
    cPassword: "Sajed@123",
    photoURL: "https://avatar.iran.liara.run/public/1",
  });

  // create account mutation
  const { mutate: createAccountMutate, isPending } = useMutation({
    mutationKey: ["CREATE_A_NEW_ACCOUNT"],
    mutationFn: () => {
      return createAccount(formData);
    },
    onSuccess: (data) => {
      if (data?.data?.status === "success") {
        toast.success("Account created successfully");
        setUser(data?.data?.data?.user);
      } else {
        toast.error("Failed to create the account");
      }
    },
    onError: (err: AxiosError) => {
      const msg =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        "Failed to create the account, try again...";
      toast.error(msg);
    },
  });

  const handleChange = (dataKey: string, val: string) => {
    setFormData((prev) => {
      return {
        ...prev,
        [dataKey]: val,
      };
    });
  };

  const handleStep1Next = () => {
    if (!formData.name) {
      return toast.error("Name is required");
    }

    if (!formData.email) {
      return toast.error("Email is required");
    }

    // Simple, commonly used email regex:
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      return toast.error("Please enter a valid email address");
    }

    setStep(2);
  };

  const handleFinalSubmit = async () => {
    if (!formData.password) {
      return toast.error("Please create a strong password");
    }

    if (!isPasswordStrong) {
      return toast.error("Password has to be strong, try again");
    }

    if (!formData.cPassword) {
      return toast.error("Please confirm the password.");
    }

    if (formData.cPassword !== formData.password) {
      return toast.error("Passwords does not match");
    }

    createAccountMutate();
  };

  return {
    handleChange,
    handleStep1Next,
    handleFinalSubmit,
    setIsPasswordStrong,
    step,
    setStep,
    formData,
    createAccountMutate,
    isPending,
  };
};

export default useSignupHandler;
