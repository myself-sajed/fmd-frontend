import { Box, HeartPlus, LogIn, UserPlus } from "lucide-react";

const siteLinks = {
  landing: {
    title: "Home",
    link: "/",
    routeLink: "",
  },
  cases: {
    title: "Cases",
    link: "/cases",
    routeLink: "cases",
    Icon: HeartPlus,
  },
  caseDetails: (caseId?: string) => ({
    title: "Case Details",
    link: `/cases/${caseId}`,
    routeLink: ":caseId",
    Icon: HeartPlus,
  }),
  login: {
    title: "Login",
    link: "/auth/login",
    routeLink: "login",
    Icon: LogIn,
  },
  signup: {
    title: "Sign-up",
    link: "/auth/sign-up",
    routeLink: "sign-up",
    Icon: UserPlus,
  },
  pageNotFound: {
    title: "Page Not Found",
    link: "/page-not-found",
    Icon: Box,
  },
  redirection: {
    title: "Redirecting User",
    link: "/redirection",
    Icon: Box,
  },
};

export default siteLinks;
