"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { CheckIcon, EyeIcon, EyeOffIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
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
import { cn } from "@/lib/utils";
import { signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const passwordRules = [
  {
    id: "length",
    label: "At least 8 characters",
    test: (value: string) => value.length >= 8,
  },
  {
    id: "uppercase",
    label: "One uppercase letter",
    test: (value: string) => /[A-Z]/.test(value),
  },
  {
    id: "lowercase",
    label: "One lowercase letter",
    test: (value: string) => /[a-z]/.test(value),
  },
  {
    id: "number",
    label: "One number",
    test: (value: string) => /\d/.test(value),
  },
] as const;

type FieldName = "name" | "email" | "password";
type FormErrors = Partial<Record<FieldName, string>>;

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

export default function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const router = useRouter()

  const passwordChecks = passwordRules.map((rule) => ({
    ...rule,
    passed: rule.test(password),
  }));
  const passwordValid = passwordChecks.every((check) => check.passed);

  function clearError(field: FieldName) {
    setErrors((previous) => {
      if (!previous[field]) return previous;
      const next = { ...previous };
      delete next[field];
      return next;
    });
  }

  function validate(): FormErrors {
    const next: FormErrors = {};
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) {
      next.name = "Full name is required.";
    } else if (trimmedName.length < 2) {
      next.name = "Enter at least 2 characters.";
    }

    if (!trimmedEmail) {
      next.email = "Email is required.";
    } else if (!EMAIL_PATTERN.test(trimmedEmail)) {
      next.email = "Enter a valid email address.";
    }

    if (!password) {
      next.password = "Password is required.";
    } else if (!passwordValid) {
      next.password = "Password does not meet all requirements.";
    }

    return next;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const next = validate();
    setErrors(next);

    const firstInvalid = (["name", "email", "password"] as const).find(
      (field) => next[field]
    );
    if (firstInvalid) {
      const input = event.currentTarget.elements.namedItem(
        firstInvalid
      ) as HTMLElement | null;
      input?.focus();
      return;
    }

    const userData = {
      name,
      email,
      password,
      role: "student"
    }

    try {
      const { data, error } = await signUp.email({
        ...userData
      });
      if(error){
        throw new Error("Sign up failed")
      }
      if(data){
        toast.add({
          type: "success",
          title: "Account created! Sign in to explore courses",
          description:
            "Sign-up successfull.Now login and explore our courses",
        });
        router.refresh()
        router.push('/sign-in')
      }
    } catch (error) {
      console.error(error instanceof Error ? error.message : error);
      throw new Error("Something is wrong!");
    }
    
  }

  function handleGoogleSignUp() {
    // Design-only: wire this button to the Google authentication flow.
    toast.add({
      type: "info",
      title: "Google sign-up not connected",
      description:
        "Connect this button to your auth client to enable Google registration.",
    });
  }

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <h1 className="text-2xl font-bold tracking-tight">
          Create your account
        </h1>
        <CardDescription>
          Join EduConnect as a student or instructor.
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit} noValidate>
        <CardContent className="pb-4">
          <FieldGroup>
            <Field data-invalid={errors.name ? "true" : undefined}>
              <FieldLabel htmlFor="signup-name">Full Name</FieldLabel>
              <Input
                id="signup-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Jane Doe"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                  clearError("name");
                }}
                aria-invalid={errors.name ? true : undefined}
                aria-describedby={errors.name ? "signup-name-error" : undefined}
              />
              {errors.name && (
                <FieldError id="signup-name-error">{errors.name}</FieldError>
              )}
            </Field>

            <Field data-invalid={errors.email ? "true" : undefined}>
              <FieldLabel htmlFor="signup-email">Email</FieldLabel>
              <Input
                id="signup-email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="jane@example.com"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  clearError("email");
                }}
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={
                  errors.email ? "signup-email-error" : undefined
                }
              />
              {errors.email && (
                <FieldError id="signup-email-error">{errors.email}</FieldError>
              )}
            </Field>

            <Field data-invalid={errors.password ? "true" : undefined}>
              <FieldLabel htmlFor="signup-password">Password</FieldLabel>
              <div className="relative">
                <Input
                  id="signup-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="••••••••"
                  className="pr-9"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    clearError("password");
                  }}
                  aria-invalid={errors.password ? true : undefined}
                  aria-describedby={
                    errors.password
                      ? "signup-password-error signup-password-rules"
                      : "signup-password-rules"
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
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
                <FieldError id="signup-password-error">
                  {errors.password}
                </FieldError>
              )}
              <ul
                id="signup-password-rules"
                className="mt-1 grid grid-cols-1 gap-x-4 gap-y-1 text-xs sm:grid-cols-2"
              >
                {passwordChecks.map((check) => (
                  <li
                    key={check.id}
                    className={cn(
                      "flex items-center gap-1.5 transition-colors",
                      check.passed
                        ? "text-(--color-success)"
                        : "text-muted-foreground",
                    )}
                  >
                    <CheckIcon
                      aria-hidden="true"
                      className={cn(
                        "size-3.5 shrink-0",
                        check.passed ? "opacity-100" : "opacity-40",
                      )}
                    />
                    {check.label}
                  </li>
                ))}
              </ul>
            </Field>

            
          </FieldGroup>
        </CardContent>

        <CardFooter className="flex-col gap-3">
          <Button type="submit" variant="gradient" size="lg" className="w-full cursor-pointer">
            Sign Up
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
            className="w-full cursor-pointer"
            onClick={handleGoogleSignUp}
          >
            <GoogleIcon />
            Continue with Google
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="font-medium text-(--color-primary) underline-offset-4 hover:underline"
            >
              Sign In
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
