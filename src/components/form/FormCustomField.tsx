import React from "react";
import {
	FormControl,
	FormDescription,
	FormItem,
	FormLabel,
	FormMessage
} from "./form";
import { Input } from "@/components/ui/input";

const FormCustomField = (props: any) => {
	return (
		<FormItem>
			{props.label && <FormLabel>{props.label}</FormLabel>}
			<FormControl>
				<Input placeholder={props.placeholder} {...props.field} />
			</FormControl>
			{props.description && <FormDescription>{props.description}</FormDescription>}
			<FormMessage />
		</FormItem>
	);
};

export default FormCustomField;
