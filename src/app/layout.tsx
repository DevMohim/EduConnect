import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import Navbar from "@/components/layout/navbar";
import { Toaster } from "@/components/ui/toast";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EduConnect — Learning Management System",
  description:
    "EduConnect connects students, instructors, and administrators with course discovery, learning, and assessment tools.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${plusJakartaSans.variable} ${inter.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        <Navbar />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
