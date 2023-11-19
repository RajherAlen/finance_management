"use client";
import React from "react";
import Card from "src/components/card/Card";
import formatCurrency from "src/lib/utils/formatCurrency";
import { formatDate } from "src/lib/utils/formatDate";
import { useAppSelector } from "src/store/hooks";

const LastTransactions = () => {
	const { transactions } = useAppSelector((state) => state.transactionStore);

	return (
        <div>
            <p className="font-semibold text-sm mb-3">Last Transactions</p>
            <Card>
                {transactions.map((transaction) => {
                    return (
                        <div className="flex justify-between items-center py-2" key={transaction.id}>
                            <p className="text-sm">{transaction.description}</p>
                            <p className="text-sm">{transaction.category}</p>
                            <p className="text-sm">{formatCurrency(transaction.amount)}</p>
                            <p className="text-sm">{formatDate({ date: transaction.date!, format: 'D.MM.YYYY' })}</p>
                        </div>
                    );
                })}
            </Card>
        </div>
	);
};

export default LastTransactions;
