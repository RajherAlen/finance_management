import BudgetCard from "./BudgetCard";
import BudgetProgressList from "./BudgetProgressList";
// import LastTransactions from "./LastTransactions";
import TransactionListCard from "./TransactionListCard";

const TransactionListDisplay = () => {
	return (
		<div className="flex gap-5 flex-wrap">
			<div className="flex flex-col flex-1 gap-5">
				<TransactionListCard />

				{/* <div className="mt-10"><LastTransactions /></div> */}
			</div>
			<div className="w-full max-w-[550px]">
				<div className="flex flex-col gap-3">
					<BudgetCard />
					<BudgetProgressList />
				</div>
			</div>
		</div>
	);
};

export default TransactionListDisplay;
