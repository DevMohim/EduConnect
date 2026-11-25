"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { EyeIcon, EyeOffIcon, Loader2Icon, TriangleAlertIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/toast";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldName = "email" | "password";
type FormErrors = Partial<Record<FieldName, string>>;

type AccountErrorKey =
  | "invalid-credentials"
  | "unverified-email"
  | "blocked-account";

const accountErrors: Record<
  AccountErrorKey,
  { title: string; description: string }
> = {
  "invalid-credentials": {
    title: "Unable to sign in",
    description: "The email or password you entered is incorrect.",
  },
  "unverified-email": {
    title: "Email not verified",
    description:
      "Your email hasn't been verified yet. Check your inbox for the verification link.",
  },
  "blocked-account": {
    title: "Account blocked",
    description:
      "Your account has been suspended. Contact support for assistance.",
  },
};

/**
 * Design-only helper: picks which account message to preview so every state
 * can be reviewed in the browser. Replace with real API error mapping when
 * this form is connected to the auth backend.
 */
function previewAccountError(email: string): AccountErrorKey {
  if (email.startsWith("blocked@")) return "blocked-account";
  if (email.startsWith("unverified@")) return "unverified-email";
  return "invalid-credentials";
}

function GoogleIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      className="size-4 shrink-0"
    >
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [accountError, setAccountError] = useState<AccountErrorKey | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, []);

  function clearError(field: FieldName) {
    setErrors((previous) => {
      if (!previous[field]) return previous;
      const next = { ...previous };
      delete next[field];
      return next;
    });
  }

  function handleFieldChange(field: FieldName, value: string) {
    if (field === "email") setEmail(value);
    else setPassword(value);
    clearError(field);
    setAccountError(null);
  }

  function validate(): FormErrors {
    const next: FormErrors = {};
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      next.email = "Email is required.";
    } else if (!EMAIL_PATTERN.test(trimmedEmail)) {
      next.email = "Enter a valid email address.";
    }

    if (!password) {
      next.password = "Password is required.";
    }

    return next;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const next = validate();
    setErrors(next);
    setAccountError(null);

    const firstInvalid = (["email", "password"] as const).find(
      (field) => next[field]
    );
    if (firstInvalid) {
      const input = event.currentTarget.elements.namedItem(
        firstInvalid
      ) as HTMLElement | null;
      input?.focus();
      return;
    }

    // Design-only: simulate the request so the loading state is reviewable,
    // then preview one of the account messages. Replace with a call to the
    // auth API and map its error responses onto `accountError`.
    setIsSubmitting(true);
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setIsSubmitting(false);
      setAccountError(previewAccountError(email.trim().toLowerCase()));
    }, 600);
  }

  function handleGoogleSignIn() {
    // Design-only: wire this button to the Google authentication flow.
    toast.add({
      type: "info",
      title: "Google sign-in not connected",
      description:
        "Connect this button to your auth client to enable Google sign-in.",
    });
  }

  function handleResendVerification() {
    // Design-only: wire this to a resend-verification endpoint.
    toast.add({
      type: "info",
      title: "Verification email not sent",
      description:
        "Connect this action to your auth backend to resend verification emails.",
    });
  }

  const message = accountError ? accountErrors[accountError] : null;

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
        <CardDescription>
          Sign in to continue learning on EduConnect.
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit} noValidate>
        <CardContent className="pb-4">
          {message && (
            <Alert variant="destructive" className="mb-4">
              <TriangleAlertIcon />
              <AlertTitle>{message.title}</AlertTitle>
              <AlertDescription>
                {message.description}
                {accountError === "unverified-email" && (
                  <button
                    type="button"
                    onClick={handleResendVerification}
                    className="mt-1 block font-medium text-foreground underline-offset-4 hover:underline"
                  >
                    Resend verification email
                  </button>
                )}
              </AlertDescription>
            </Alert>
          )}

          <FieldGroup>
            <Field data-invalid={errors.email ? "true" : undefined}>
              <FieldLabel htmlFor="signin-email">Email</FieldLabel>
              <Input
                id="signin-email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="jane@example.com"
                value={email}
                onChange={(event) => handleFieldChange("email", event.target.value)}
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={errors.email ? "signin-email-error" : undefined}
              />
              {errors.email && (
                <FieldError id="signin-email-error">{errors.email}</FieldError>
              )}
            </Field>

            <Field data-invalid={errors.password ? "true" : undefined}>
              <FieldLabel htmlFor="signin-password">Password</FieldLabel>
              <div className="relative">
                <Input
                  id="signin-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="pr-9"
                  value={password}
                  onChange={(event) =>
                    handleFieldChange("password", event.target.value)
                  }
                  aria-invalid={errors.password ? true : undefined}
                  aria-describedby={
                    errors.password ? "signin-password-error" : undefined
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                  className="absolute top-1/2 right-1.5 -translate-y-1/2 rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
                >
                  {showPassword ? (
                    <EyeOffIcon className="size-4" />
                  ) : (
                    <EyeIcon className="size-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <FieldError id="signin-password-error">
                  {errors.password}
                </FieldError>
              )}
            </Field>
          </FieldGroup>
        </CardContent>

        <CardFooter className="flex-col gap-3">
          <Button
            type="submit"
            variant="gradient"
            size="lg"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting && <Loader2Icon className="animate-spin" />}
            {isSubmitting ? "Signing In..." : "Sign In"}
          </Button>

          <div className="relative flex w-full items-center">
            <Separator className="absolute inset-0" />
            <span className="relative mx-auto bg-muted/50 px-2 text-xs text-muted-foreground">
              or continue with
            </span>
          </div>

          <Button
            type="button"
            variant="outline"
            size="lg"
            className="w-full"
            onClick={handleGoogleSignIn}
            disabled={isSubmitting}
          >
            <GoogleIcon />
            Continue with Google
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="font-medium text-[var(--color-primary)] underline-offset-4 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
