"use client";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "./ui/chart";
const chartData = [
	{ status: "delivered", orders: 275, fill: "var(--color-delivered)" },
	{ status: "returned", orders: 120, fill: "var(--color-returned)" },
	{ status: "pending", orders: 46, fill: "var(--color-pending)" },
];
const chartConfig = {
	orders: {
		label: "Orders",
	},
	delivered: {
		label: "Delivered",
		color: "var(--chart-2)",
	},
	returned: {
		label: "Returned",
		color: "var(--chart-5)",
	},
	pending: {
		label: "Pending",
		color: "var(--chart-3)",
	},
} satisfies ChartConfig;
const AppPieChart = () => {
	const totalOrders = chartData.reduce(
		(total, item) => total + item.orders,
		0
	);
	return (
		<div>
			<h1 className="text-lg font-bold mb-6">
				Current Month&apos;s Orders{" "}
			</h1>
			<ChartContainer
				config={chartConfig}
				className="mx-auto aspect-square max-h-[250px]"
			>
				<PieChart>
					<ChartTooltip
						cursor={false}
						content={<ChartTooltipContent hideLabel />}
					/>
					<Pie
						data={chartData}
						dataKey="orders"
						nameKey="status"
						innerRadius={60}
						strokeWidth={5}
					>
						<Label
							content={({ viewBox }) => {
								if (
									viewBox &&
									"cx" in viewBox &&
									"cy" in viewBox
								) {
									return (
										<text
											x={viewBox.cx}
											y={viewBox.cy}
											textAnchor="middle"
											dominantBaseline="middle"
										>
											<tspan
												x={viewBox.cx}
												y={viewBox.cy}
												className="fill-foreground text-3xl font-bold"
											>
												{totalOrders.toLocaleString()}
											</tspan>
											<tspan
												x={viewBox.cx}
												y={(viewBox.cy || 0) + 24}
												className="fill-muted-foreground"
											>
												Orders
											</tspan>
										</text>
									);
								}
							}}
						/>
					</Pie>
				</PieChart>
			</ChartContainer>
			<div className="mt-4 flex flex-col items-center gap-2">
				<div className="flex items-center gap-2 leading-none font-medium">
					Trending up by 5.2% this month{" "}
					<TrendingUp className="h-4 w-4 text-green-500" />
				</div>
				<div className="text-muted-foreground leading-none">
					Showing total Orders for the current month
				</div>
			</div>
		</div>
	);
};

export default AppPieChart;
