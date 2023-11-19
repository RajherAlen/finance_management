"use client";

import React, { useState } from "react";

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
import { addTransaction, updateCategoryTotal, updateTotalExpense } from "../transactionSlice";
import Modal from "src/components/dialog/Modal";
import { PlusCircleIcon } from "lucide-react";

const AddExpense = () => {
	const dispatch = useAppDispatch();
	const [isOpen, setIsOpen] = useState<boolean>(false);

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
				date: `${new Date()}`,
				description: values.description,
				type: "expense"
			})
		);
		dispatch(updateTotalExpense(values.amount));
		dispatch(updateCategoryTotal({category: values.category, amount: values.amount}));


		setIsOpen(false);
	};

	return (
		<Modal
			open={isOpen}
			onOpenChange={() => setIsOpen(!isOpen)}
			trigger={<PlusCircleIcon stroke="#4b5563" width="16" height="16" />}
			title={`Add expense`}
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-3"
				>
					<FormField
						control={form.control}
						name="amount"
						render={({ field }) => (
							<FormCustomInput
								requiered
								label="Amount"
								field={field}
								type="number"
							/>
						)}
					/>
					<FormField
						control={form.control}
						name="category"
						render={({ field }) => (
							<FormSelect
								fullWidth
								requiered
								label="Category"
								placeholder="Select Category"
								field={field}
								options={categoryOptions}
							/>
						)}
					/>
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormCustomInput
								label="Description"
								field={field}
							/>
						)}
					/>
					<Button type="submit" className="mt-5">
						Submit
					</Button>
				</form>
			</Form>
		</Modal>
	);
};

export default AddExpense;
