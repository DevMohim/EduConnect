import type { Metadata } from "next";

import SignUpForm from "@/components/auth/sign-up-form";

export const metadata: Metadata = {
  title: "Sign Up | EduConnect",
  description:
    "Create a student or instructor account on EduConnect with email and password or Google.",
};

export default function SignUpPage() {
  return (
    <main className="mx-auto w-full max-w-md px-4 py-12">
      <SignUpForm />
    </main>
  );
}
