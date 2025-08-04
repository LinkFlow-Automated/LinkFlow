"use client";

import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { WiMoonAltFirstQuarter } from "react-icons/wi";

export default function ToggleTheme() {
  const { theme, setTheme } = useTheme();
  return (
    <Button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      <WiMoonAltFirstQuarter />
    </Button>
  );
}
