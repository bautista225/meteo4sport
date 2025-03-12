"use client";

import { Callout } from "./Callout";
import { RiCheckboxCircleFill, RiErrorWarningFill } from "@remixicon/react";

type Props = {
  title: string;
  message: string;
  warning?: boolean;
};

export default function CalloutCard({ title, message, warning }: Props) {
  return (
    <Callout
      title={title}
      icon={warning ? RiErrorWarningFill : RiCheckboxCircleFill}
    >
      {message}
    </Callout>
  );
}
