"use client";
import {
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
	type ChartConfig,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

const chartConfig = {
	Total: {
		label: "Total",
		color: "blue",
	},
	Delivered: {
		label: "Delivered",
		color: "var(--chart-2)",
	},
	Returned: {
		label: "Returned",
		color: "red",
	},
} satisfies ChartConfig;
const chartData = [
	{ month: "January", Total: 186, Delivered: 80, Returned: 186 - 80 },
	{ month: "February", Total: 305, Delivered: 200, Returned: 305 - 200 },
	{ month: "March", Total: 237, Delivered: 120, Returned: 237 - 120 },
	{ month: "April", Total: 173, Delivered: 100, Returned: 173 - 100 },
	{ month: "May", Total: 209, Delivered: 130, Returned: 209 - 130 },
	{ month: "June", Total: 214, Delivered: 140, Returned: 214 - 140 },
	{ month: "July", Total: 200, Delivered: 130, Returned: 200 - 130 },
	{ month: "August", Total: 160, Delivered: 100, Returned: 160 - 100 },
	{ month: "September", Total: 280, Delivered: 170, Returned: 280 - 170 },
	{ month: "October", Total: 240, Delivered: 150, Returned: 240 - 150 },
	{ month: "November", Total: 200, Delivered: 130, Returned: 200 - 130 },
	{ month: "December", Total: 400, Delivered: 220, Returned: 400 - 220 },
];

const AppBarChart = () => {
	return (
		<div>
			<h1 className="text-lg font-bold mb-6">Orders Data</h1>
			<ChartContainer
				config={chartConfig}
				className="min-h-[200px] w-full"
			>
				<BarChart accessibilityLayer data={chartData}>
					<CartesianGrid vertical={false} />
					<XAxis
						dataKey="month"
						tickLine={false}
						tickMargin={10}
						axisLine={false}
						tickFormatter={(value) => value.slice(0, 3)}
					/>
					<YAxis tickLine={false} tickMargin={10} axisLine={false} />
					<ChartTooltip content={<ChartTooltipContent />} />
					<ChartLegend content={<ChartLegendContent />} />
					<Bar dataKey="Total" fill="var(--color-Total)" radius={4} />
					<Bar
						dataKey="Delivered"
						fill="var(--color-Delivered)"
						radius={4}
					/>
					<Bar
						dataKey="Returned"
						fill="var(--color-Returned)"
						radius={4}
					/>
				</BarChart>
			</ChartContainer>
		</div>
	);
};

export default AppBarChart;
