"use client";

import { ReactNode } from "react";
import { Callout } from "./Callout";
import { RiCheckboxCircleFill, RiErrorWarningFill } from "@remixicon/react";

type Props = {
  title: string;
  message?: ReactNode;
  variant?: "default" | "success" | "error" | "warning" | "neutral" | undefined;
  children?: ReactNode;
};

export default function CalloutCard({
  title,
  message,
  variant = "default",
  children,
}: Props) {
  return (
    <Callout
      title={title}
      icon={variant === "warning" ? RiErrorWarningFill : RiCheckboxCircleFill}
      variant={variant}
    >
      {message}
      {children}
    </Callout>
  );
}
