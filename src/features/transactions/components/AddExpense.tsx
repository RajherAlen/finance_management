"use client";

import React, { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
	Form,
	FormDescription,
	FormField,
	FormMessage
} from "src/components/form/form";
import Button from "src/components/button/Button";
import FormCustomInput from "src/components/form/FormCustomInput";
import FormSelect from "src/components/form/FormSelect";
import { categoryOptions } from "../model/categoryOptions";
import { expenseSchema } from "../model/expenseSchema";
import { useAppDispatch } from "src/store/hooks";
import { addTransaction, updateTotalExpense } from "../transactionSlice";
import Card from "src/components/card/Card";
import { AlertCircleIcon, PlusCircleIcon } from "lucide-react";
import FormError from "src/components/form/FormError";

const AddExpense = ({ required = true }: { required?: boolean }) => {
	const dispatch = useAppDispatch();

	const form = useForm<z.infer<typeof expenseSchema>>({
		resolver: zodResolver(expenseSchema),
		defaultValues: {
			amount: 0,
			category: ""
		}
	});

	const { amount, category } = form.formState.errors;

	const onSubmit = (values: z.infer<typeof expenseSchema>) => {
		dispatch(
			addTransaction({
				id: 1,
				amount: values.amount,
				category: values.category,
				date: new Date(),
				type: "expense"
			})
		);

		dispatch(updateTotalExpense(values.amount));

		form.reset({
			amount: 0,
			category: ""
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
				<div className="flex gap-2">
					<Card variant="outline" className="flex flex-1 gap-4">
						<FormField
							control={form.control}
							name="amount"
							render={({ field }) => (
								<FormCustomInput
									requiered={required}
									field={field}
									inputClassName="h-6 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
									type="number"
									hideErrorMessage
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
									hideErrorMessage
								/>
							)}
						/>
					</Card>

					<Button
						variant="outline"
						className="flex items-center gap-2"
					>
						<PlusCircleIcon
							width={16}
							height={16}
							stroke="#1B2327"
						/>
						Add
					</Button>
				</div>

				{amount || category ? (
					<Card variant="outline-error">
						{amount && <FormError message={amount.message} />}
						{category && <FormError message={category.message} />}
					</Card>
				) : null}
			</form>
		</Form>
	);
};

export default AddExpense;
