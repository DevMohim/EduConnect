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
  title: "Sign In | EduConnect",
  description: "Sign in to your EduConnect account.",
};

export default function SignInPage() {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-16">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>
            Sign in to continue learning on EduConnect.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center text-sm text-muted-foreground">
          Email and password authentication is coming soon.
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
