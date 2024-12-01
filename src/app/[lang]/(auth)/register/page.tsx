import { UserAuthFormRegister } from "@/app/[lang]/(auth)/components/user-auth-form-register";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};
export default function RegisterPage() {
  return <UserAuthFormRegister />;
}
