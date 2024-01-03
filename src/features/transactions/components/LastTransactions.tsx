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

			{transactions.map((transaction, i) => {
				return (
					<div key={Math.random()}>
						<ExpenseCard {...transaction} />
						{transactions.length !== i + 1 && <Separator />}
					</div>
				);
			})}
		</div>
	);
};

export default LastTransactions;
