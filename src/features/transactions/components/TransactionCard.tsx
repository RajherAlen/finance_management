import React from "react";
import Card from "src/components/card/Card";
import TransactionIcons from "./TransactionIcons";
import formatCurrency from "src/lib/utils/formatCurrency";
import AddTransaction from "./AddTransaction";

const TransactionCard = (props: any) => {
	const isIncome = props.type === "income";

	return (
		<Card className="w-full max-w-[300px]">
			<div className="flex gap-2">
				<Card variant={isIncome ? "success" : "warning"} size="sml">
					<TransactionIcons type={props.type} />
				</Card>

				<div className="flex flex-col flex-1 gap-1">
					<p className="font-semibold text-xs text-gray-400 uppercase">
						{props.type}
					</p>
					<p className="font-bold text-sm">
						{formatCurrency(props.amount)}
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
