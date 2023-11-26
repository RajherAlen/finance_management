import React from "react";
import { CircleDollarSign, Landmark, Wallet } from "lucide-react";
import Card from "src/components/card/Card";

const TransactionIcons = ({ type }: { type: string }) => {
	let transactionIcon;
	let transactionTypeColor: "success" | "warning" | "info" | "error";

	switch (type) {
		case "income":
			transactionIcon = <Wallet stroke="#f97316" />;
			transactionTypeColor = "warning";
			break;
		case "expense":
			transactionIcon = <Wallet stroke="#dc2626" />;
			transactionTypeColor = "error";
			break;
		case "savings":
			transactionIcon = <Landmark stroke="#10b981" />;
			transactionTypeColor = "success";
			break;
		case "budget":
			transactionIcon = <CircleDollarSign stroke="#0ea5e9" />;
			transactionTypeColor = "info";
			break;
		default:
			transactionTypeColor = "error";
			transactionIcon = <Wallet stroke="#dc2626" />;
			break;
	}

	return (
		<Card variant={transactionTypeColor} size="sml">
			{transactionIcon}
		</Card>
	);
};

export default TransactionIcons;
