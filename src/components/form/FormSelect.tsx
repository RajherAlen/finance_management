import React from "react";
import {
	FormControl,
	FormDescription,
	FormItem,
	FormLabel,
	FormMessage
} from "./form";
import Select, { SelectItem } from "../select/Select";

interface FormSelectProps {
	label: string;
	placeholder: string;
	description?: string;
	requiered?: boolean;
	field: any;
	options: SelectItem[];
	fullWidth?: boolean;
	className?: string;
}

const FormSelect = (props: FormSelectProps) => {
	return (
		<FormItem className={props.className}>
			{props.label && (
				<FormLabel>
					{props.label}
					{props.requiered && (
						<span className="text-sky-600 ml-1">*</span>
					)}
				</FormLabel>
			)}
			<FormControl>
				<Select
					value={props.field.value}
					onChange={props.field.onChange}
					fullWidth={props.fullWidth}
					placeholder={props.placeholder}
					options={props.options}
				/>
			</FormControl>
			{props.description && (
				<FormDescription>{props.description}</FormDescription>
			)}
			<FormMessage />
		</FormItem>
	);
};

export default FormSelect;
