"use client";

import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormField } from "src/components/form/form";
import Button from "src/components/button/Button";
import FormCustomInput from "src/components/form/FormCustomInput";
import { expenseSchema } from "../model/expenseSchema";
import { useAppDispatch } from "src/store/hooks";
import { addTransaction, updateTotalExpense } from "../transactionSlice";
import Card from "src/components/card/Card";
import { PlusCircleIcon } from "lucide-react";
import FormError from "src/components/form/FormError";
import FormDatePicker from "src/components/form/FormDatePicker";
import {v4 as uuidv4} from 'uuid';

const AddExpense = ({ required = true }: { required?: boolean }) => {
	const dispatch = useAppDispatch();

	const form = useForm<z.infer<typeof expenseSchema>>({
		resolver: zodResolver(expenseSchema),
		defaultValues: {
			amount: 0,
			category: "",
			date: undefined
		}
	});

	const { amount, category } = form.formState.errors;

	const onSubmit = (values: z.infer<typeof expenseSchema>) => {
		dispatch(
			addTransaction({
				id: uuidv4(),
				amount: values.amount,
				category: values.category,
				date: values.date,
				type: "expense"
			})
		);

		dispatch(updateTotalExpense(values.amount));

		form.reset({
			amount: 0,
			category: "",
			date: undefined
		});
	};


	return (
		<div>
			<div className="flex justify-between items-center mb-5">
				<p className="text-xl font-semibold">Add your recurring expenses</p>
				<Card variant="outline" size="sml" radius="md">
					<div className="flex gap-1">
						<Button size="sm" variant="secondary">Essentials</Button>
						<Button size="sm" variant="ghost">Non-Essentials</Button>
					</div>
				</Card>
			</div>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-3"
				>
					<div className="space-y-1">
						<div className="flex gap-2 items-start">
							<Card
								variant="outline"
								className="flex flex-1 gap-4"
							>
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
										<FormCustomInput
											requiered={required}
											field={field}
											placeholder="Enter expense type"
											inputClassName="h-6 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
											type="text"
											hideErrorMessage
										/>
									)}
								/>
							</Card>

							<FormField
								control={form.control}
								name="date"
								render={({ field }) => (
									<FormDatePicker field={field} />
								)}
							/>
						</div>
					</div>

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

					{amount || category ? (
						<Card variant="outline-error">
							{amount && <FormError message={amount.message} />}
							{category && (
								<FormError message={category.message} />
							)}
						</Card>
					) : null}
				</form>
			</Form>
		</div>
	);
};

export default AddExpense;
