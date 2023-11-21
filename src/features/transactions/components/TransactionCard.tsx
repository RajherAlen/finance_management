import React from "react";
import Card from "src/components/card/Card";
import TransactionIcons from "./TransactionIcons";
import formatCurrency from "src/lib/utils/formatCurrency";
import AddTransaction from "./AddTransaction";

interface TransactionCardProps {
	type: "income" | "expense" | "savings" | "budget";
	amount: number;
}

const TransactionCard = (props: TransactionCardProps) => {
	return (
		<Card className="flex-1 min-w-[200px]">
			<div className="flex gap-2">
				<TransactionIcons type={props.type} />

				<div className="flex flex-col flex-1 gap-1">
					<p className="font-semibold text-xs text-gray-400 uppercase">
						{props.type}
					</p>
					<p className="font-bold text-sm">
						{formatCurrency(props.amount ? props.amount : 0)}
					</p>
				</div>

				{props.type === "income" && (
					<div className="flex items-start">
						<AddTransaction type={props.type} />
					</div>
				)}
			</div>
		</Card>
	);
};

export default TransactionCard;
