"use client";

import { Card } from "./Card";
import Text from "./Text";
import Metric from "./Metric";

type Props = {
  title: string;
  metric: string;
  icon?: React.ReactNode;
};

export default function StatCard({ title, metric, icon }: Props) {
  return (
    <Card>
      <Text>{title}</Text>
      <div className="flex flex-row items-center gap-3">
        <Metric>{metric}</Metric>
        {icon}
      </div>
    </Card>
  );
}
