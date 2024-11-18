import Signin from "@/components/Auth/Signin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register Page",
  description: "This is registration page for Kigali Deutsch Academy",
  // other metadata
};

export default function Register() {
  return (
    <>
      <Signin />
    </>
  );
}
