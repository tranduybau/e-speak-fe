import { Metadata } from "next";

import { UserAuthFormLogin } from "@/app/[lang]/(auth)/components/user-auth-form-login";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function LoginPage() {
  return <UserAuthFormLogin />;
}
