'use client'
import React from "react";
import Card from "src/components/card/Card";
import formatCurrency from "src/lib/utils/formatCurrency";
import { useAppSelector } from "src/store/hooks";

const BudgetCard = () => {
	const {income, totalExpense} = useAppSelector((state) => state.transactionStore);

	return (
		<Card className="flex justify-between">
			<div className="flex-1 text-center">
				<p className="font-semibold text-xs text-muted uppercase">
					Your balance
				</p>
				<p className="font-bold text-sm">{formatCurrency(income - totalExpense)}</p>
			</div>
		</Card>
	);
};

export default BudgetCard;
