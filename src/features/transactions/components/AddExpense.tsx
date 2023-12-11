"use client";

import React, { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormField } from "src/components/form/form";
import Button from "src/components/button/Button";
import FormCustomInput from "src/components/form/FormCustomInput";
import FormSelect from "src/components/form/FormSelect";
import { categoryOptions } from "../model/categoryOptions";
import { expenseSchema } from "../model/expenseSchema";
import { useAppDispatch } from "src/store/hooks";
import { addTransaction, updateTotalExpense } from "../transactionSlice";
import Card from "src/components/card/Card";

const AddExpense = ({ required = true }: { required?: boolean }) => {
	const dispatch = useAppDispatch();

	const form = useForm<z.infer<typeof expenseSchema>>({
		resolver: zodResolver(expenseSchema),
		defaultValues: {
			amount: 0,
			category: "",
			description: ""
		}
	});

	const onSubmit = (values: z.infer<typeof expenseSchema>) => {
		dispatch(
			addTransaction({
				id: 1,
				amount: values.amount,
				category: values.category,
				date: new Date(),
				description: values.description,
				type: "expense"
			})
		);
		dispatch(updateTotalExpense(values.amount));

		form.reset({
			amount: 0,
			category: "",
			description: ""
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
				<Card variant="outline" className="flex gap-4">
					<FormField
						control={form.control}
						name="amount"
						render={({ field }) => (
							<FormCustomInput
								requiered={required}
								field={field}
								inputClassName="h-6 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
								type="number"
							/>
						)}
					/>
					<div className="border-1 border-l"></div>
					<FormField
						control={form.control}
						name="category"
						render={({ field }) => (
							<FormSelect
								fullWidth
								requiered={required}
								ghostSelect
								className="flex-1"
								placeholder="Select Category"
								field={field}
								options={categoryOptions}
							/>
						)}
					/>
				</Card>
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormCustomInput
							requiered={required}
							label="Short description"
							field={field}
						/>
					)}
				/>
				<Button type="submit" className="mt-5">
					Add Expense
				</Button>
			</form>
		</Form>
	);
};

export default AddExpense;
