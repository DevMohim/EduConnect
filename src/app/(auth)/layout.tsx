import type { ReactNode } from "react";

/**
 * Shared shell for auth pages: vertically centers the page content.
 * Each auth page renders its own <main> element.
 */
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-1 items-center justify-center">{children}</div>
  );
}
