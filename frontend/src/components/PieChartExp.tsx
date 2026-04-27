import { Legend, Pie, PieChart, Tooltip } from "recharts";
import type { Expense } from "./types/types";

const COLORS = [
  "#9e6b7a",
  "#c4967a",
  "#7a9cc4",
  "#7ac4a0",
  "#c4c47a",
  "#a07ac4",
];
export default function PieChartExp({
  isAnimationActive = true,
  expenses,
}: {
  isAnimationActive?: boolean;
  expenses?: Expense[];
}) {
  const chartData = expenses?.reduce(
    (acc, expense) => {
      const existing = acc.find((item) => item.name === expense.category);
      if (existing) {
        existing.value += Number(expense.amount);
      } else {
        acc.push({
          name: expense.category,
          value: Number(expense.amount),
          fill: COLORS[acc.length % COLORS.length],
        });
      }
      return acc;
    },
    [] as { name: string; value: number; fill: string }[],
  );
  return (
    <PieChart width={280} height={280}>
      <Legend />
      <Pie
        data={chartData}
        dataKey="value"
        isAnimationActive={isAnimationActive}
        outerRadius={110}
      />
      <Tooltip defaultIndex={2} />
    </PieChart>
  );
}
