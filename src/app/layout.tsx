import ThemeProvider from "@/components/ThemeProvider";
import "./globals.css";
import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";

const ubuntu = Ubuntu({ subsets: ["latin"], weight: "500" });

export const metadata: Metadata = {
  title: "Parsa Airline",
  description:
    "Airline Company Owned By Parsa Jafari. See: http://parsajafari.vercel.app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="transition-all">
      <body className={ubuntu.className}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
