import React from "react";
import { ThemeProvider } from "./theme-provider";
import { TanstackProvider } from "@/components/tanstack-provider";

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute={"class"} defaultTheme="system" enableSystem>
      <TanstackProvider>{children}</TanstackProvider>
    </ThemeProvider>
  );
}
