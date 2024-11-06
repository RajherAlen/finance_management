import AnalyticsBudgetSplitChart from 'src/features/analytics/components/AnalyticsBudgetSplitChart';
import TotalSpentChart from 'src/features/analytics/components/TotalSpentChart';

import BudgetProgressList from './BudgetProgressList';
import LastTransactions from './LastTransactions';
import TransactionListCard from './TransactionListCard';

const TransactionListDisplay = () => {
    return (
        <div className='flex flex-wrap gap-5'>
            <div className='flex flex-1 flex-col gap-5'>
                <TransactionListCard />

                <div className='flex flex-col gap-4'>
                    <div className='grid grid-cols-1 2xl:grid-cols-2 gap-6 items-start'>
                        <TotalSpentChart />
                        <BudgetProgressList />
                    </div>

                    <AnalyticsBudgetSplitChart />
                </div>
            </div>

            <div className='l-aside sticky top-0 flex flex-col'>
                <LastTransactions />
            </div>
        </div>
    );
};

export default TransactionListDisplay;
