import React from "react";
import {
	FormControl,
	FormDescription,
	FormItem,
	FormLabel,
	FormMessage
} from "./form";
import { Input } from "../input/Input";

interface FormCustomInputProps {
	label: string;
	placeholder?: string;
	description?: string;
	requiered?: boolean;
	field: any;
	type?: "number" | "string";
}

const FormCustomInput = (props: FormCustomInputProps) => {
	return (
		<FormItem>
			{props.label && (
				<FormLabel>
					{props.label}
					{props.requiered && (
						<span className="text-sky-600 ml-1">*</span>
					)}
				</FormLabel>
			)}
			<FormControl>
				<Input
					placeholder={props.placeholder}
					type={props.type}
					{...props.field}
				/>
			</FormControl>
			{props.description && (
				<FormDescription>{props.description}</FormDescription>
			)}
			<FormMessage />
		</FormItem>
	);
};

export default FormCustomInput;
