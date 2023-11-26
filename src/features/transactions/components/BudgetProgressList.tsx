"use client";
import React from "react";
import Card from "src/components/card/Card";
import { ProgressBar } from "src/components/progress/ProgressBar";
import Title from "src/components/text/Title";
import { calcPercentage } from "src/lib/utils/calcPercentage";
import { useAppSelector } from "src/store/hooks";

const BudgetProgressList = () => {
	const {
		budgetCategory,
		spendByCategory: { needs, wants, savings }
	} = useAppSelector((store) => store.transactionStore);

	if (!budgetCategory) return null;

	return (
		<div className="flex flex-col flex-1 min-w-[300px] max-w-[50%]">
			<Title>Budget split (50, 30, 20)</Title>
			<Card className="flex flex-col gap-5 flex-1">
				<ProgressBar
					value={calcPercentage(needs, budgetCategory.needs)}
					label="Needs"
					total={budgetCategory.needs}
				/>
				<ProgressBar
					value={calcPercentage(wants, budgetCategory.wants)}
					label="Wants"
					total={budgetCategory.wants}
				/>
				<ProgressBar
					value={calcPercentage(savings, budgetCategory.savings)}
					label="Savings"
					total={budgetCategory.savings}
				/>
			</Card>
		</div>
	);
};

export default BudgetProgressList;
