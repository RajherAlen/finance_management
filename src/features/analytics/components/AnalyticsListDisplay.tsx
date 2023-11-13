"use client";

import React from "react";
import { Transaction } from "src/features/transactions/model/transactionModel";
import { useAppSelector } from "src/store/hooks";

const AnalyticsListDisplay = () => {
	const { transactions } = useAppSelector((state) => state.transactionStore);

    return (
		<div>
			{transactions.map((transaction: Transaction) => {
				return (
					<div key={Math.random()}>
						<p>{transaction.amount}</p>
						<p>{transaction.category}</p>
						<p>{transaction.description}</p>
					</div>
				);
			})}
		</div>
	);
};

export default AnalyticsListDisplay;
