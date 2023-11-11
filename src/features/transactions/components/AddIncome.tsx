"use client";

import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormField } from "src/components/form/form";
import Button from "src/components/button/Button";
import FormCustomInput from "src/components/form/FormCustomInput";

const incomeSchema = z.object({
	amount: z.coerce
		.number({
			required_error: "Amount is required",
			invalid_type_error: "Amount must be a number"
		})
		.positive({ message: "Amount must be positive number" }),
	description: z.string().max(200)
});

const AddIncome = () => {
	const form = useForm<z.infer<typeof incomeSchema>>({
		resolver: zodResolver(incomeSchema),
		defaultValues: {
			amount: 0,
			description: ""
		}
	});

	const onSubmit = (values: z.infer<typeof incomeSchema>) => {
		console.log(values);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
				<FormField
					control={form.control}
					name="amount"
					render={({ field }) => (
						<FormCustomInput requiered label="Amount" field={field} type="number" />
					)}
				/>
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
                        <FormCustomInput label="Description" field={field} />

					)}
				/>
				<Button type="submit" className="mt-5">
					Submit
				</Button>
			</form>
		</Form>
	);
};

export default AddIncome;
