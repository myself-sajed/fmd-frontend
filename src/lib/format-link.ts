import { useAuthStore } from "@/store/auth-store";

const formatLink = (link: string) => {
  const role = useAuthStore.getState().user?.role?.name;
  return `/${role}/${link}`;
};

export default formatLink;
