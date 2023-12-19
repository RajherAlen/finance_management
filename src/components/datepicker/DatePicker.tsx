"use client";

import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "../popover/Popover";
import Button from "../button/Button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../calendar/Calendar";
import { cn } from "src/lib/utils/cn";

export function DatePicker({ action }: { action?: (date: Date | undefined) => void }) {
	const [date, setDate] = useState<Date>();

	useEffect(() => {
		if(action) {
			action(date);
		}
	}, [date, action]);

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					className={cn(
						"h-12 justify-start text-left font-normal",
						!date && "text-muted-foreground"
					)}
				>
					<CalendarIcon className="mr-2 h-4 w-4" />
					{date ? format(date, "d-L-y") : <span>Add Date</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0" align="start">
				<Calendar
					mode="single"
					selected={date}
					onSelect={setDate}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	);
}

export default DatePicker;
