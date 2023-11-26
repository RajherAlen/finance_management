import React from "react";
import formatCurrency from "src/lib/utils/formatCurrency";
import { formatDate } from "src/lib/utils/formatDate";
import { Transaction } from "../model/transactionModel";
import TransactionIcons from "./TransactionIcons";

const ExpenseCard = (props: Transaction) => {
	const { description, category, amount, date, type } = props;

	return (
		<div className="flex gap-5">
			<div className="flex flex-1 gap-3">
				<TransactionIcons type={category.toLowerCase()} />

				<div>
					<p className="text-sm font-semibold mb-[2px]">{description}</p>
					<p className="text-xs text-gray-400">{formatDate({ date: date, format: "D.MM.YYYY" })}</p>
				</div>
			</div>
			<p className="text-sm font-bold">{formatCurrency(amount)}</p>
		</div>
	);
};

export default ExpenseCard;
