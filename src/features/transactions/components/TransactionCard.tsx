import React from "react";
import Card from "src/components/card/Card";
import TransactionIcons from "./TransactionIcons";
import formatCurrency from "src/lib/utils/formatCurrency";
import { PlusCircleIcon } from "lucide-react";
import Modal from "src/components/dialog/Modal";
import Button from "src/components/button/Button";
import FormField from "src/components/form/FormCustomField";
import { Input } from "src/components/input/Input";
import { Label } from "src/components/label/label";

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
					<Modal
						trigger={<PlusCircleIcon stroke="#4b5563" width="16" />}
						title="Add income"
						footer={<Button variant="outline">Save</Button>}
					>
						<Label>Add Income</Label>
						<Input placeholder="Add Income" />
					</Modal>
				</div>
			</div>
		</Card>
	);
};

export default TransactionCard;
