"use client";

import { Card } from "./Card";
import Text from "./Text";
import Metric from "./Metric";

type Props = {
  title: string;
  metric: string;
};

export default function StatCard({ title, metric }: Props) {
  return (
    <Card>
      <Text>{title}</Text>
      <Metric>{metric}</Metric>
    </Card>
  );
}
