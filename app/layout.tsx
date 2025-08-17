import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume Skill Test",
  description: "Upload resume, get suggestions, take a skill quiz, and generate an ATS LaTeX resume."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
