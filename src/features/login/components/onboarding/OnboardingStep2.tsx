"use client";

import React from "react";

import { useAppSelector } from "src/store/hooks";

import LastTransactions from "src/features/transactions/components/LastTransactions";
import OnboardingLayout from "./OnboardingLayout";
import Card from "src/components/card/Card";
import AddIncome from "src/features/transactions/components/AddIncome";
import AddExpense from "src/features/transactions/components/AddExpense";
import formatCurrency from "src/lib/utils/formatCurrency";
import TransactionIcons from "src/features/transactions/components/TransactionIcons";

const OnboardingStep2 = () => {
	const { income } = useAppSelector((state) => state.transactionStore);

	return (
		<OnboardingLayout formIsValid={income > 0}>
			<p className="text-3xl font-bold mb-8">Income and Expenses</p>
			<div className="grid grid-cols-2 gap-10 h-full">
				<Card variant="outline" radius="xlg" size="xlrg">
					<p className="text-xl mb-4 font-semibold">
						Add your income
					</p>

					<AddIncome />

					{income > 0 && (
						<div className="flex gap-2 mt-5">
							<TransactionIcons type="budget" />
							<div>
								<p className="text-sm font-medium">
									Total Income:
								</p>
								<p className="text-xl font-bold text-emerald-600">
									{formatCurrency(income)}
								</p>
							</div>
						</div>
					)}
				</Card>

				<Card variant="outline" radius="xlg" size="xlrg">
					<p className="text-xl mb-4 font-semibold">
						Add your recurring expenses
					</p>

					<AddExpense required={false} />

					<LastTransactions />
				</Card>
			</div>
		</OnboardingLayout>
	);
};

export default OnboardingStep2;
