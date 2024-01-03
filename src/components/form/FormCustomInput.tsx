import React from "react";
import {
	FormControl,
	FormDescription,
	FormItem,
	FormLabel,
	FormMessage
} from "./form";
import { Input } from "../input/Input";
import { InputType } from "zlib";

interface FormCustomInputProps {
	label?: string;
	placeholder?: string;
	description?: string;
	requiered?: boolean;
	field: any;
	className?: string;
	inputClassName?: string;
	type?: InputType;
	hideErrorMessage?: boolean;
}

const FormCustomInput = (props: FormCustomInputProps) => {
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
				<Input
					placeholder={props.placeholder}
					type={props.type}
					className={props.inputClassName}
					{...props.field}
				/>
			</FormControl>
			{props.description && (
				<FormDescription>{props.description}</FormDescription>
			)}
			{!props.hideErrorMessage && <FormMessage />}
		</FormItem>
	);
};

export default FormCustomInput;
