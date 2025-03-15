"use client";

import { ReactNode } from "react";
import { Callout } from "./Callout";
import { RiCheckboxCircleFill, RiErrorWarningFill } from "@remixicon/react";

type Props = {
  title: string;
  message?: string;
  warning?: boolean;
  children?: ReactNode;
};

export default function CalloutCard({
  title,
  message,
  warning,
  children,
}: Props) {
  return (
    <Callout
      title={title}
      icon={warning ? RiErrorWarningFill : RiCheckboxCircleFill}
      variant={warning ? "warning" : "default"}
    >
      {message || ""}
      {children || ""}
    </Callout>
  );
}
