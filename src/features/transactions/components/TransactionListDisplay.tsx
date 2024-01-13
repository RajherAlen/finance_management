import Card from 'src/components/card/Card';
import ExpenseByCategoryChart from 'src/features/analytics/components/ExpenseByCategoryChart';

import AddExpense from './AddExpense';
import LastTransactions from './LastTransactions';
import TransactionListCard from './TransactionListCard';
import TotalSpentChart from 'src/features/analytics/components/TotalSpentChart';

const TransactionListDisplay = () => {
    return (
        <div className="flex flex-wrap gap-5">
            <div className="flex flex-1 flex-col gap-5">
                <TransactionListCard />
                <div className="grid grid-cols-2">
                    <ExpenseByCategoryChart />
                    <TotalSpentChart />
                </div>
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
