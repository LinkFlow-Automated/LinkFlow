import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Provider from "./Provider";
import { getLinkStats } from "@/lib/services/link-analitycs";
import NavbarWrapper from "@/components/shared/NavbarWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LinkFlow",
  description: "Generate optimized link titles and descriptions",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const date = new Date();
  const links = await getLinkStats("113jd4jd", "1084ndn", {
    from: date,
    to: date,
  });
  console.log(links);
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          <NavbarWrapper />
          {children}
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
