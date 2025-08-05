"use client";

import { usePathname } from "next/navigation";
import Navbar from "./navbar";

const HIDDEN_PATHS = ["/login", "/signup", "/(auth)/login", "/(auth)/signup"];

export default function NavbarWrapper() {
  const pathname = usePathname();
  if (HIDDEN_PATHS.includes(pathname)) {
    return null;
  }
  return <Navbar />;
}