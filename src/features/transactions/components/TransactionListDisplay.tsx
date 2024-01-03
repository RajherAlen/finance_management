import Card from "src/components/card/Card";
import AddExpense from "./AddExpense";

import LastTransactions from "./LastTransactions";
import TransactionListCard from "./TransactionListCard";

const TransactionListDisplay = () => {
	return (
		<div className="flex gap-5 flex-wrap">
			<div className="flex flex-col flex-1 gap-5">
				<TransactionListCard />
			</div>
			<div className="w-full max-w-[520px]">
				<Card>
					<AddExpense customTitle="Expense" />
					<LastTransactions />
				</Card>
			</div>
		</div>
	);
};

export default TransactionListDisplay;
