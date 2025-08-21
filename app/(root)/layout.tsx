import Footer from "@/components/shared/Footer";
import FooterWrapperCta from "@/components/shared/footer-wrapper-cta";
import Navbar from "@/components/shared/navbar";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <FooterWrapperCta>
        <Footer />
      </FooterWrapperCta>
    </div>
  );
}
