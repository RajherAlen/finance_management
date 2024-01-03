import React from "react";
import Card from "src/components/card/Card";
import TransactionIcons from "./TransactionIcons";
import formatCurrency from "src/lib/utils/formatCurrency";
import AddTransaction from "./AddTransaction";

interface TransactionCardProps {
	type: "income" | "expense" | "savings" | "budget";
	amount: number;
	additionalAction?: React.ReactNode
}

const TransactionCard = (props: TransactionCardProps) => {
	return (
		<Card className="flex flex-col justify-center flex-1 min-w-[200px]">
			<div className="flex justify-end">
				{props.additionalAction}
			</div>
			<div className="flex gap-2">
				<TransactionIcons type={props.type} />

				<div className="flex flex-col flex-1 gap-1">
					<p className="font-bold text-lg">
						{formatCurrency(props.amount ? props.amount : 0)}
					</p>
					<p className="text-xs text-muted uppercase">
						{props.type}
					</p>
				</div>
			</div>
		</Card>
	);
};

export default TransactionCard;
