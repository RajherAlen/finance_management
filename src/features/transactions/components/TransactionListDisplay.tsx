
import Card from 'src/components/card/Card';
import ExpenseByCategoryChart from 'src/features/analytics/components/ExpenseByCategoryChart';
import TotalSpentChart from 'src/features/analytics/components/TotalSpentChart';

import AddExpense from './AddExpense';
import LastTransactions from './LastTransactions';
import TransactionListCard from './TransactionListCard';

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

            <div className="l-aside flex flex-col">
                <LastTransactions />
            </div>
        </div>
    );
};

export default TransactionListDisplay;
