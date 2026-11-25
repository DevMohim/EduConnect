import type { Metadata } from "next";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Browse Courses | EduConnect",
  description:
    "Discover published courses from expert instructors on EduConnect.",
};

export default function BrowseCoursesPage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center gap-4 px-4 py-16 text-center">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Browse Courses
      </h1>
      <p className="max-w-lg text-muted-foreground">
        Search, filter, and enroll in published courses. Course discovery is
        being built — check back soon.
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
