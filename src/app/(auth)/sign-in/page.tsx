import type { Metadata } from "next";

import SignInForm from "@/components/auth/sign-in-form";

export const metadata: Metadata = {
  title: "Sign In | EduConnect",
  description:
    "Sign in to your EduConnect account with email and password or Google.",
};

export default function SignInPage() {
  return (
    <main className="mx-auto w-full max-w-md px-4 py-12">
      <SignInForm />
    </main>
  );
}
