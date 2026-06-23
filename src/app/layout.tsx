import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Fira_Code } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

import { FunFactProvider } from "@/context/FunFactContext";
import FunFactToast from "@/components/ui/FunFactToast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sai Vikranth Kanuru | AI Engineer",
  description: "Portfolio of Sai Vikranth, an AI Engineer building Generative AI and agentic systems with a focus on RAG applications.",
  keywords: ["portfolio", "AI engineer", "generative AI", "RAG", "agentic systems"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${firaCode.variable}`} suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <ThemeProvider>
          <FunFactProvider>
            {children}
            <FunFactToast />
          </FunFactProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
