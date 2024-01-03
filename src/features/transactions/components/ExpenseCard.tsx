import React from "react";
import formatCurrency from "src/lib/utils/formatCurrency";
import { formatDate } from "src/lib/utils/formatDate";
import { Transaction } from "../model/transactionModel";
import CategoryIcons from "./CategoryIcons";
import Button from "src/components/button/Button";
import { XIcon } from "lucide-react";
import { deleteTransaction } from "../transactionSlice";
import { useAppDispatch } from "src/store/hooks";

const ExpenseCard = (props: Transaction) => {
	const { description, amount, date, id } = props;
	const dispatch = useAppDispatch();

	const handleDeleteTransaction = () => {
		dispatch(deleteTransaction(id))
	}

	return (
		<div className="flex gap-5 items-center">
			<div className="flex flex-1 gap-3">
				<CategoryIcons category="house" />

				<div>
					<div className="flex items-center gap-2">
						<p className="text-base font-medium">
							{formatCurrency(amount)}
						</p>
						<p className="text-[11px] font-medium mb-[2px] px-2 py-1 bg-primary/30 rounded-full">
							{description}
						</p>
					</div>

					<p className="text-xs text-muted">
						{formatDate({ date: date, format: "D.MM.YYYY" })}
					</p>
				</div>
			</div>

			<Button
				variant="outline"
				size="icon"
				onClick={handleDeleteTransaction}
				className="rounded-full border-black h-5 w-5 hover:bg-black/10 hover:border-black/10"
			>
				<XIcon width={14} height={14} />
			</Button>
		</div>
	);
};

export default ExpenseCard;
