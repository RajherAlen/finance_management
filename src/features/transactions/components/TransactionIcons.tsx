import React from "react";
import { Banknote, Wallet } from "lucide-react";

const TransactionIcons = ({ type }: { type: string }) => {
	switch (type) {
		case "income":
			return <Wallet stroke="#10b981" />;
		case "expense":
			return <Wallet stroke="#dc2626" />;
		case "savings":
			return <Banknote stroke="#dc2626" />;
		default:
			return <Wallet />;
	}
};

export default TransactionIcons;
