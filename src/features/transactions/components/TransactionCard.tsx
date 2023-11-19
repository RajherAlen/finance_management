import React from "react";
import Card from "src/components/card/Card";
import TransactionIcons from "./TransactionIcons";
import formatCurrency from "src/lib/utils/formatCurrency";
import AddTransaction from "./AddTransaction";

interface TransactionCardProps {
	type: "income" | "expense" | "savings";
	amount: number;
}

const TransactionCard = (props: TransactionCardProps) => {
	let transactionTypeColor: "success" | "warning" | "info";

	switch (props.type) {
		case "income":
			transactionTypeColor = "success";
			break;
		case "expense":
			transactionTypeColor = "warning";
			break;
		case "savings":
			transactionTypeColor = "info";
			break;
		default:
			transactionTypeColor = "info";
			break;
	}

	return (
		<Card className="w-full lg:max-w-[300px]">
			<div className="flex gap-2">
				<Card variant={transactionTypeColor} size="sml">
					<TransactionIcons type={props.type} />
				</Card>

				<div className="flex flex-col flex-1 gap-1">
					<p className="font-semibold text-xs text-gray-400 uppercase">
						{props.type}
					</p>
					<p className="font-bold text-sm">
						{formatCurrency(props.amount ? props.amount : 0)}
					</p>
				</div>

				<div className="flex items-start">
					<AddTransaction type={props.type} />
				</div>
			</div>
		</Card>
	);
};

export default TransactionCard;
