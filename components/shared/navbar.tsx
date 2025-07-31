"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "FEATURES", href: "/features" },
    { name: "CREATOR", href: "/creator" },
    { name: "PRICING", href: "/pricing" },
  ];
  return (
    <div className="w-full bg-gray-50 px-4 sm:px-6 py-2 fixed top-0 z-50 shadow">
      <header className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-2 sm:gap-3 w-32">
          <Link href="/" className="flex items-center">
            <Image
              alt="linkflow logo"
              src={"/linkflow-high-resolution-logo-transparent.png"}
              width={1000}
              height={1000}
              className="w-full h-full"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Button
              key={link.name}
              variant="ghost"
              className={`text-gray-700 font-medium hover:text-gray-900 ${
                isActive(link.href) ? "bg-lime-400 hover:bg-lime-500" : ""
              }`}
            >
              <Link href={link.href}>{link.name}</Link>
            </Button>
          ))}
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden sm:flex items-center gap-4 p-2 bg-blend-color rounded-full">
          <Button
            variant="ghost"
            className="text-gray-700 font-medium hover:text-gray-900 rounded-full px-4 sm:px-6 py-2"
          >
            <Link href="/login">LOG IN</Link>
          </Button>
          <Button
            variant="default"
            className="bg-lime-400 hover:bg-lime-500 text-black font-medium px-4 sm:px-6 py-2 rounded-full"
          >
            <Link href="/signup">SIGN UP</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="size-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <div className="flex flex-col gap-6 mt-6">
              {/* Mobile Logo */}
              <div className="flex items-center gap-3 pb-4 border-b">
                <Link href="/" className="flex items-center">
                  <Image
                    alt="linkflow logo"
                    src={"/linkflow-high-resolution-logo-transparent.png"}
                    width={1000}
                    height={1000}
                    className="w-24 h-auto"
                  />
                </Link>
              </div>

              {/* Mobile Navigation */}
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Button
                    key={link.name}
                    variant="ghost"
                    className={`text-gray-700 font-medium hover:text-gray-900 ${
                      isActive(link.href) ? "bg-lime-400 hover:bg-lime-500" : ""
                    }`}
                  >
                    <Link href={link.href}>{link.name}</Link>
                  </Button>
                ))}
              </nav>

              {/* Mobile Auth */}
              <div className="flex flex-col gap-3 pt-4 border-t">
                <Button
                  variant="ghost"
                  className="justify-start text-gray-700 font-medium hover:text-gray-900 py-3"
                >
                  LOG IN
                </Button>
                <Button
                  variant="default"
                  className="bg-lime-400 hover:bg-lime-500 text-black font-medium px-6 py-3 rounded-full"
                >
                  SIGN UP
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </header>
    </div>
  );
}
