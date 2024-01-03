"use client";

import React from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import FormCustomInput from "src/components/form/FormCustomInput";
import { Form, FormField } from "src/components/form/form";

import { useAppDispatch } from "src/store/hooks";
import { savingSchema } from "../model/savingSchema";
import { addToSavings } from "../transactionSlice";
import { v4 as uuidv4 } from "uuid";
import Button from "src/components/button/Button";
import { PlusCircleIcon } from "lucide-react";

const AddSaving = ({ additionalAction }: { additionalAction?: () => void }) => {
	const dispatch = useAppDispatch();

	const defaultValues = {
		name: "",
		goalAmount: 0,
		currentlySaved: 0
	};

	const form = useForm<z.infer<typeof savingSchema>>({
		resolver: zodResolver(savingSchema),
		defaultValues
	});

	const onSubmit = (data: z.infer<typeof savingSchema>) => {
		dispatch(
			addToSavings({
				id: uuidv4(),
				name: data.name,
				goalAmount: data.goalAmount,
				currentlySaved: data.currentlySaved
			})
		);

		if (additionalAction !== undefined) {
			additionalAction();
		}

		form.reset(defaultValues);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-5 max-w-[610px]"
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormCustomInput
							label="Give your financial goal a name"
							placeholder="e.g. Emergency Fund, Dream Vacation, Home Purchase"
							className="w-full"
							field={field}
						/>
					)}
				/>

				<FormField
					control={form.control}
					name="goalAmount"
					render={({ field }) => (
						<FormCustomInput
							label="Enter your goal amount"
							placeholder="Enter amount"
							className="w-full"
							type="number"
							field={field}
						/>
					)}
				/>

				<FormField
					control={form.control}
					name="currentlySaved"
					render={({ field }) => (
						<FormCustomInput
							label="Enter an amount you currently have saved"
							placeholder="Enter amount"
							className="w-full"
							type="number"
							field={field}
						/>
					)}
				/>
				<Button variant="outline" className="flex items-center gap-2">
					<PlusCircleIcon width={16} height={16} stroke="#1B2327" />
					Add
				</Button>
			</form>
		</Form>
	);
};

export default AddSaving;
