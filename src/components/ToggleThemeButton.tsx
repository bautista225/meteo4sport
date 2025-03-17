"use client";

import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "./Button";

export default function ToggleThemeButton() {
  const { theme, setTheme } = useTheme();

  const dark = theme === "dark";

  const className =
    "hover:cursor-pointer text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-500";

  return (
    <Button
      variant="ghost"
      onClick={() => setTheme(`${dark ? "light" : "dark"}`)}
    >
      {dark ? (
        <SunIcon className={className} />
      ) : (
        <MoonIcon className={className} />
      )}
    </Button>
  );
}
