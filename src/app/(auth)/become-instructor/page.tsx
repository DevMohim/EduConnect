import type { Metadata } from "next";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Become an Instructor | EduConnect",
  description:
    "Create courses, teach students, and grow your audience on EduConnect.",
};

export default function BecomeInstructorPage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center gap-4 px-4 py-16 text-center">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Become an Instructor
      </h1>
      <p className="max-w-lg text-muted-foreground">
        Create courses, reach students, and earn from your expertise.
        Instructor registration is being built — check back soon.
      </p>
      <Link
        href="/"
        className={buttonVariants({ variant: "gradient", size: "lg", className: "mt-2" })}
      >
        Back to Home
      </Link>
    </main>
  );
}
