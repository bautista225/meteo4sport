"use client";

import { Button } from "./Button";
import { RiGithubFill } from "@remixicon/react";

export default function GitHubButton() {
  const className =
    "hover:cursor-pointer text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-500";

  return (
    <Button
      variant="ghost"
      onClick={() =>
        window.open("https://github.com/bautista225/meteo4sport", "_blank")
      }
    >
      <RiGithubFill className={className} />
    </Button>
  );
}
