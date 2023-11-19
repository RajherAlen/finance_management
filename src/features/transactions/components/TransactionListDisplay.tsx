import LastTransactions from "./LastTransactions";
import TransactionListCard from "./TransactionListCard";

const TransactionListDisplay = () => {
	return (
		<div>
			<TransactionListCard />
			<div className="mt-10">
				<LastTransactions />
			</div>
		</div>
	);
};

export default TransactionListDisplay;
