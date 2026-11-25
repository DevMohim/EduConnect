"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MenuIcon } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Browse Courses" },
];

function isActiveLink(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

function TextLogo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "font-primary text-xl font-extrabold tracking-tight",
        className
      )}
    >
      <span className="bg-gradient-to-r from-brand-from to-brand-to bg-clip-text text-transparent">
        Edu
      </span>
      <span className="text-foreground">Connect</span>
    </span>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 md:grid md:grid-cols-[1fr_auto_1fr]">
        {/* Left: text logo */}
        <Link
          href="/"
          aria-label="EduConnect home"
          onClick={closeMenu}
          className="md:justify-self-start"
        >
          <TextLogo />
        </Link>

        {/* Center: primary routes (desktop) */}
        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const active = isActiveLink(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "text-brand-from"
                    : "text-foreground/70 hover:text-brand-from"
                )}
              >
                {link.label}
                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-brand-from to-brand-to"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right: actions (desktop) */}
        <div className="hidden items-center gap-2 md:flex md:justify-self-end">
          <Link
            href="/become-instructor"
            className={buttonVariants({ variant: "gradient-outline" })}
          >
            Become an Instructor
          </Link>
          <Link
            href="/sign-in"
            className={buttonVariants({ variant: "gradient-outline" })}
          >
            Sign In
          </Link>
          <Link href="/sign-up" className={buttonVariants({ variant: "gradient" })}>
            Sign Up
          </Link>
        </div>

        {/* Mobile menu */}
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open navigation menu"
                className="md:hidden"
              />
            }
          >
            <MenuIcon />
          </SheetTrigger>
          <SheetContent
            side="right"
            className="gap-0 p-0 sm:max-w-sm"
            aria-label="Navigation menu"
          >
            <SheetHeader className="border-b border-border px-4 py-4">
              <SheetTitle className="sr-only">Navigation menu</SheetTitle>
              <SheetDescription className="sr-only">
                Browse EduConnect pages and account links.
              </SheetDescription>
              <Link
                href="/"
                aria-label="EduConnect home"
                onClick={closeMenu}
              >
                <TextLogo />
              </Link>
            </SheetHeader>

            <nav aria-label="Mobile" className="flex flex-col gap-1 px-3 py-4">
              {navLinks.map((link) => {
                const active = isActiveLink(pathname, link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    onClick={closeMenu}
                    className={cn(
                      "rounded-md px-3 py-2.5 text-base font-medium transition-colors",
                      active
                        ? "bg-brand-from/5 text-brand-from"
                        : "text-foreground hover:bg-muted hover:text-brand-from"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto flex flex-col gap-2 border-t border-border p-4">
              <Link
                href="/become-instructor"
                onClick={closeMenu}
                className={buttonVariants({
                  variant: "gradient-outline",
                  size: "lg",
                  className: "w-full",
                })}
              >
                Become an Instructor
              </Link>
              <Link
                href="/sign-in"
                onClick={closeMenu}
                className={buttonVariants({
                  variant: "gradient-outline",
                  size: "lg",
                  className: "w-full",
                })}
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                onClick={closeMenu}
                className={buttonVariants({
                  variant: "gradient",
                  size: "lg",
                  className: "w-full",
                })}
              >
                Sign Up
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
