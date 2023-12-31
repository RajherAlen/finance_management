"use client";
import React from "react";
import TransactionCard from "./TransactionCard";
import { useAppSelector } from "src/store/hooks";

const TransactionListDisplay = () => {
	const transactionStore = useAppSelector((state) => state.transactionStore);

	const totalExpense = transactionStore.transactions
		.filter((transaction: any) => transaction.type === "expense")
		.reduce((sum: number, transaction: any) => sum + transaction.amount, 0);

	return (
		<div className="flex gap-3">
			<TransactionCard amount={transactionStore.income} type="income" />
			<TransactionCard amount={totalExpense} type="expense" />
		</div>
	);
};

export default TransactionListDisplay;
