"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { useSession } from "@/lib/auth-client";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import DropdownUser from "./dropdown-user";

export default function Navbar() {
  const session = useSession();
  console.log(session);
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "FEATURES", href: "/features" },
    { name: "CREATOR", href: "/creator" },
    { name: "PRICING", href: "/pricing" },
  ];

  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleLinkClick = () => {
    setIsSheetOpen(false);
  };

  return (
    <div className="w-full backdrop-blur-sm px-4 sm:px-6 py-3 fixed top-0 z-50 shadow-sm border-b border-accent">
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
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Button
              key={link.name}
              variant="ghost"
              className={`text-gray-600 font-medium hover:text-gray-900 hover:bg-gray-100 transition-all duration-200 rounded-lg px-3 py-1.5 text-sm md:px-4 md:py-2 md:text-base ${
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
        {session.data?.user ? (
          <DropdownUser className="hidden md:flex" user={session.data.user} />
        ) : (
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="ghost"
              className="text-gray-600 font-medium hover:text-gray-900 hover:bg-gray-100 transition-all duration-200 rounded-lg px-3 py-1.5 text-sm md:px-4 md:py-2"
            >
              <Link href="/login">LOGIN</Link>
            </Button>
            <Button
              variant="default"
              className="font-medium px-4 py-1.5 text-sm md:px-6 md:py-2 rounded-lg transition-all duration-200"
            >
              <Link href="/signup">SIGNUP</Link>
            </Button>
          </div>
        )}

        {/* Mobile Menu */}
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-600 hover:text-gray-900 transition-all duration-200 px-3 cursor-pointer"
            >
              <Menu className="size-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[300px] sm:w-[400px]"
          >
            <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>
            <div className="flex flex-col gap-6 mt-6">
              {/* Mobile Logo */}
              <div className="flex items-center gap-3 pb-4 mx-3 border-b border-gray-200">
                <Link
                  href="/"
                  className="flex items-center"
                  onClick={handleLinkClick}
                >
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
                    className={`font-medium rounded-lg justify-start px-4 mx-2 transition-all duration-200 ${
                      isActive(link.href)
                        ? "text-gray-900 font-semibold"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                    asChild
                  >
                    <Link href={link.href} onClick={handleLinkClick}>
                      {link.name}
                    </Link>
                  </Button>
                ))}
              </nav>

              {/* Mobile Auth */}
              {session.data?.user ? (
                <DropdownUser user={session.data.user} />
              ) : (
                <div className="flex flex-col gap-3 pt-4 border-t border-gray-200">
                  <Button
                    variant="ghost"
                    className={`justify-start px-6 mx-2 rounded-lg transition-all duration-200 ${
                      pathname === "/login"
                        ? "text-gray-900 font-semibold"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                    asChild
                  >
                    <Link href="/login" onClick={handleLinkClick}>
                      LOGIN
                    </Link>
                  </Button>
                  <Button
                    variant="default"
                    className="font-medium px-6 mx-2 rounded-lg transition-all duration-200"
                    asChild
                  >
                    <Link href="/signup" onClick={handleLinkClick}>
                      SIGNUP
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </header>
    </div>
  );
}
