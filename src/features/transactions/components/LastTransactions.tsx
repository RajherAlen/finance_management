"use client";
import React from "react";
import { useAppSelector } from "src/store/hooks";
import ExpenseCard from "./ExpenseCard";
import Title from "src/components/text/Title";
import Separator from "src/components/separator/Separator";

const LastTransactions = () => {
	const { transactions } = useAppSelector((state) => state.transactionStore);

	if (transactions.length === 0) return null;

	return (
		<div>
			<Separator />
			
			<div className="flex flex-col gap-4">
				{transactions.map((transaction) => {
					return <ExpenseCard {...transaction} key={Math.random()} />;
				})}
			</div>
		</div>
	);
};

export default LastTransactions;
