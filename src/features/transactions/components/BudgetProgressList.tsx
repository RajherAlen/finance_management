"use client";
import React from "react";
import Card from "src/components/card/Card";
import { ProgressBar } from "src/components/progress/ProgressBar";
import { calcPercentage } from "src/lib/utils/calcPercentage";
import { useAppSelector } from "src/store/hooks";

const BudgetProgressList = () => {
	const {
		budgetCategory,
		spendByCategory: { needs, wants, savings }
	} = useAppSelector((store) => store.transactionStore);
	
    if (!budgetCategory) return null;
    
	return (
		<Card className="flex flex-col gap-5">
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
	);
};

export default BudgetProgressList;
