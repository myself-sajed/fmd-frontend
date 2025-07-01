import { useAuthStore } from "@/store/auth-store";
import { useEffect, useState } from "react";
import type { ILoginForm } from "../types/auth-types";
import { login } from "../api/auth-api";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { titleSetter } from "@/lib/title";

const useLoginHandler = () => {
  const { setUser } = useAuthStore();
  titleSetter("Account Login");
  const [formData, setFormData] = useState<ILoginForm>({
    email: "",
    password: "",
  });
  const { mutate, isPending } = useMutation({
    mutationKey: ["LOGIN"],
    mutationFn: () => login(formData),
    onSuccess: async (data) => {
      if (data?.data?.status === "success") {
        setUser(data?.data?.user);
        toast.success("User logged in successfully");
      } else {
        setUser(null);
      }
    },

    onError: () => {
      toast.error("Username or password is incorrect");
    },
  });

  useEffect(() => {
    setFormData(() => {
      return {
        email: "johndoe@example.com",
        password: "John@123",
      };
    });
  }, []);

  const handleChange = (dataKey: string, val: string) => {
    setFormData((prev) => {
      return {
        ...prev,
        [dataKey]: val,
      };
    });
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
  };

  return {
    formData,
    setFormData,
    isPending,
    handleChange,
    handleLogin,
  };
};

export default useLoginHandler;
