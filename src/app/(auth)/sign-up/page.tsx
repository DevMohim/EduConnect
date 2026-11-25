import type { Metadata } from "next";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Sign Up | EduConnect",
  description: "Create a student or instructor account on EduConnect.",
};

export default function SignUpPage() {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-16">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Create your account</CardTitle>
          <CardDescription>
            Join EduConnect as a student or instructor.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center text-sm text-muted-foreground">
          Registration is coming soon.
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Link
            href="/"
            className={buttonVariants({ variant: "gradient", size: "lg", className: "w-full" })}
          >
            Back to Home
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}
