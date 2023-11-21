"use client";
import React from "react";
import TransactionCard from "./TransactionCard";
import { useAppSelector } from "src/store/hooks";

const TransactionListCard = () => {
	const {income, totalExpense, totalSavings} = useAppSelector((state) => state.transactionStore);

	return (
		<div className="flex gap-3 flex-wrap">
			<TransactionCard amount={income} type="income" />
			<TransactionCard amount={totalExpense} type="expense" />
			<TransactionCard amount={totalSavings} type="savings" />
			<TransactionCard amount={income - totalExpense} type="budget" />
		</div>
	);
};

export default TransactionListCard;
