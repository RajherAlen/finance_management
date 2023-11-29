"use client";

import React, { useEffect } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import FormCustomInput from "src/components/form/FormCustomInput";
import { Form, FormField } from "src/components/form/form";

import { useAppDispatch, useAppSelector } from "src/store/hooks";

import OnboardingLayout from "./OnboardingLayout";
import { IncomeAndExpensesSchema } from "../../model/IncomeAndExpensesSchema";
import { setAccountInfo } from "../../loginSlice";
import Card from "src/components/card/Card";
import Button from "src/components/button/Button";
import { PlusCircleIcon } from "lucide-react";
import Separator from "src/components/separator/Separator";

const OnboardingStep2 = () => {
	const transactionStore = useAppSelector((state) => state.transactionStore);
	const dispatch = useAppDispatch();

	const form = useForm<z.infer<typeof IncomeAndExpensesSchema>>({
		resolver: zodResolver(IncomeAndExpensesSchema),
		defaultValues: {
			incomeAmount: transactionStore.income,
			expenseAmount: transactionStore.totalExpense
		}
	});

	const onSubmit = (data: z.infer<typeof IncomeAndExpensesSchema>) => {
		dispatch(setAccountInfo(data));
	};

	return (
		<OnboardingLayout
			actionToContinue={form.handleSubmit(onSubmit)}
			formIsValid={form.formState.isValid}
		>
			<p className="text-3xl font-bold mb-8">Income and Expenses</p>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-5 h-full"
				>
					<div className="grid grid-cols-2 gap-10 h-full">
						<Card variant="outline" radius="xlg" size="xlrg">
							<p className="text-xl mb-4 font-semibold">
								Add your income
							</p>
							<FormField
								control={form.control}
								name="incomeAmount"
								render={({ field }) => (
									<FormCustomInput
										requiered
										label="Amount"
										field={field}
										type="number"
									/>
								)}
							/>
							<Button variant="outline" className="mt-3">
								<PlusCircleIcon
									width={16}
									height={16}
									stroke="#1B2327"
								/>
								Add
							</Button>

							<Separator />
						</Card>
						<Card variant="outline" radius="xlg" size="xlrg">
							<p className="text-xl mb-4 font-semibold">
								Add your recurring expenses
							</p>

							<FormField
								control={form.control}
								name="expenseAmount"
								render={({ field }) => (
									<FormCustomInput
										label="Enter Amount"
										placeholder="Enter Amount"
										className="w-full"
										field={field}
									/>
								)}
							/>
						</Card>
					</div>
				</form>
			</Form>
		</OnboardingLayout>
	);
};

export default OnboardingStep2;
