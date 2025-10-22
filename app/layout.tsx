import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Provider from "./Provider";
import { getLinkStats } from "@/lib/services/link-analitycs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Breezi",
  description: "Generate optimized link titles and descriptions",
  icons: {
    icon: [
      { url: "/breezi-logo-resolution-logo-transparent.png", type: "image/png" },
    ],
    shortcut: "/breezi-logo-resolution-logo-transparent.png",
    apple: "/breezi-logo-resolution-logo-transparent.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const date = new Date();
  // const links = await getLinkStats("113jd4jd", "1084ndn", {
  //   from: date,
  //   to: date,
  // });
  // console.log(links);
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" href="/breezi-logo-resolution-logo-transparent.png" />
        <link rel="shortcut icon" type="image/png" href="/breezi-logo-resolution-logo-transparent.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          {children}
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
