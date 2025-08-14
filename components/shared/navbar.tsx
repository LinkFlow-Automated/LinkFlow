"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
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
    <div className="w-full bg-white/95 backdrop-blur-sm px-4 sm:px-6 py-3 fixed top-0 z-50 shadow-sm border-b border-gray-100">
      <header className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-2 sm:gap-3 w-32">
          <Link href="/" className="flex items-center">
            <Image
              alt="breezi logo"
              src={"/breezi-high-resolution-logo-transparent.png"}
              width={1000}
              height={1000}
              className="w-full h-full"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Button
              key={link.name}
              variant="ghost"
              className={`text-gray-600 font-medium hover:text-gray-900 hover:bg-gray-100 transition-all duration-200 rounded-lg px-4 py-2 ${
                isActive(link.href) 
                  ? "text-gray-900 bg-gray-100 hover:bg-gray-200" 
                  : ""
              }`}
            >
              <Link href={link.href}>{link.name}</Link>
            </Button>
          ))}
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <Button
            variant="ghost"
            className="text-gray-600 font-medium hover:text-gray-900 hover:bg-gray-100 transition-all duration-200 rounded-lg px-4 py-2"
          >
            <Link href="/login">LOG IN</Link>
          </Button>
          <Button
            variant="default"
            className="font-medium px-6 py-2 rounded-lg transition-all duration-200"
          >
            <Link href="/signup">SIGN UP</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="lg:hidden">
            <Button 
              variant="ghost" 
              size="icon"
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
            >
              <Menu className="size-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>
            <div className="flex flex-col gap-6 mt-6">
              {/* Mobile Logo */}
              <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                <Link href="/" className="flex items-center">
                  <Image
                    alt="breezi logo"
                    src={"/breezi-high-resolution-logo-transparent.png"}
                    width={1000}
                    height={1000}
                    className="w-24 h-auto"
                  />
                </Link>
              </div>

              {/* Mobile Navigation */}
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Button
                    key={link.name}
                    variant="ghost"
                    className={`text-gray-600 font-medium hover:text-gray-900 hover:bg-gray-100 transition-all duration-200 rounded-lg justify-start ${
                      isActive(link.href) 
                        ? "text-gray-900 bg-gray-100 hover:bg-gray-200" 
                        : ""
                    }`}
                  >
                    <Link href={link.href}>{link.name}</Link>
                  </Button>
                ))}
              </nav>

              {/* Mobile Auth */}
              <div className="flex flex-col gap-3 pt-4 border-t border-gray-200">
                <Button
                  variant="ghost"
                  className="justify-start text-gray-600 font-medium hover:text-gray-900 hover:bg-gray-100 transition-all duration-200 rounded-lg py-3"
                >
                  <Link href="/login">LOG IN</Link>
                </Button>
                <Button
                  variant="default"
                  className="font-medium px-6 py-3 rounded-lg transition-all duration-200"
                >
                  <Link href="/signup">SIGN UP</Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </header>
    </div>
  );
}
