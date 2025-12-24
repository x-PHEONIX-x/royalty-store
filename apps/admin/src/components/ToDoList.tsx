"use client";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ScrollArea } from "./ui/scroll-area";

const ToDoList = () => {
	const [date, setDate] = useState<Date | undefined>(new Date());
	const [open, setOpen] = useState(false);
	return (
		<div className="">
			<h1 className="text-lg font-bold mb-6">Tasks & TODO List</h1>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button className="w-full">
						<CalendarIcon />
						{date ? date.toDateString() : <span>Pick a Date</span>}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="p-0 w-auto">
					<Calendar
						mode="single"
						selected={date}
						onSelect={(date) => {
							setDate(date || undefined);
							setOpen(false);
						}}
						className="rounded-md border"
					/>
				</PopoverContent>
			</Popover>
			<ScrollArea className="max-h-[450px] mt-4 overflow-y-auto">
				<div className="flex flex-col gap-4">
					<Card className="p-4">
						<div className="flex items-center gap-4">
							<Checkbox id="item1" checked />
							<label
								htmlFor="item1"
								className="text-sm text-muted-foreground cursor-pointer"
							>
								Lorem ipsum dolor sit amet consectetur
								adipisicing elit.
							</label>
						</div>
					</Card>
					<Card className="p-4">
						<div className="flex items-center gap-4">
							<Checkbox id="item1" />
							<label
								htmlFor="item1"
								className="text-sm text-muted-foreground cursor-pointer"
							>
								Lorem ipsum dolor sit amet consectetur
								adipisicing elit.
							</label>
						</div>
					</Card>
					<Card className="p-4">
						<div className="flex items-center gap-4">
							<Checkbox id="item1" />
							<label
								htmlFor="item1"
								className="text-sm text-muted-foreground cursor-pointer"
							>
								Lorem ipsum dolor sit amet consectetur
								adipisicing elit.
							</label>
						</div>
					</Card>
					<Card className="p-4">
						<div className="flex items-center gap-4">
							<Checkbox id="item1" checked />
							<label
								htmlFor="item1"
								className="text-sm text-muted-foreground cursor-pointer"
							>
								Lorem ipsum dolor sit amet consectetur
								adipisicing elit.
							</label>
						</div>
					</Card>
					<Card className="p-4">
						<div className="flex items-center gap-4">
							<Checkbox id="item1" />
							<label
								htmlFor="item1"
								className="text-sm text-muted-foreground cursor-pointer"
							>
								Lorem ipsum dolor sit amet consectetur
								adipisicing elit.
							</label>
						</div>
					</Card>
					<Card className="p-4">
						<div className="flex items-center gap-4">
							<Checkbox id="item1" />
							<label
								htmlFor="item1"
								className="text-sm text-muted-foreground cursor-pointer"
							>
								Lorem ipsum dolor sit amet consectetur
								adipisicing elit.
							</label>
						</div>
					</Card>
					<Card className="p-4">
						<div className="flex items-center gap-4">
							<Checkbox id="item1" checked />
							<label
								htmlFor="item1"
								className="text-sm text-muted-foreground cursor-pointer"
							>
								Lorem ipsum dolor sit amet consectetur
								adipisicing elit.
							</label>
						</div>
					</Card>
					<Card className="p-4">
						<div className="flex items-center gap-4">
							<Checkbox id="item1" checked />
							<label
								htmlFor="item1"
								className="text-sm text-muted-foreground cursor-pointer"
							>
								Lorem ipsum dolor sit amet consectetur
								adipisicing elit.
							</label>
						</div>
					</Card>
				</div>
			</ScrollArea>
		</div>
	);
};
export default ToDoList;
