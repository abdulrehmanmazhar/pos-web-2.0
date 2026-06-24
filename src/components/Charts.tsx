import { Bar, Line, Doughnut } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";

type BarLineData = ChartData<"bar" | "line", number[], string>;
type DonutData = ChartData<"doughnut", number[], string>;

const defaultBarOptions: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    x: { ticks: { display: true } },
    y: { ticks: { beginAtZero: true } },
  },
};

const defaultLineOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: "top" },
    tooltip: { enabled: true },
  },
  scales: {
    y: { ticks: { beginAtZero: true } },
  },
};

const defaultDonutOptions: ChartOptions<"doughnut"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: "left" },
    tooltip: { enabled: true },
  },
  cutout: "65%",
};

export function BarChart({
  data,
  options,
}: {
  data: BarLineData;
  options?: ChartOptions<"bar">;
}) {
  return <Bar data={data} options={{ ...defaultBarOptions, ...options }} />;
}

export function LineChart({
  data,
  options,
}: {
  data: BarLineData;
  options?: ChartOptions<"line">;
}) {
  return <Line data={data} options={{ ...defaultLineOptions, ...options }} />;
}

export function DonutChart({
  data,
  options,
}: {
  data: DonutData;
  options?: ChartOptions<"doughnut">;
}) {
  return (
    <Doughnut data={data} options={{ ...defaultDonutOptions, ...options }} />
  );
}

export function MultiLineChart({
  data,
  options,
}: {
  data: BarLineData;
  options?: ChartOptions<"line">;
}) {
  return <Line data={data} options={{ ...defaultLineOptions, ...options }} />;
}

export function ChartEmptyState({ message = "No data for this period" }) {
  return (
    <div className="h-full w-full flex items-center justify-center text-gray-400 text-sm">
      {message}
    </div>
  );
}
