import AnalyticsBudgetSplitChart from 'src/features/analytics/components/AnalyticsBudgetSplitChart';
import TotalSpentChart from 'src/features/analytics/components/TotalSpentChart';

import LastTransactions from './LastTransactions';
import TransactionListCard from './TransactionListCard';

const TransactionListDisplay = () => {
    return (
        <div className='flex flex-wrap gap-5'>
            <div className='flex flex-1 flex-col gap-5'>
                <TransactionListCard />
                <div className='flex flex-col gap-10'>
                    <TotalSpentChart />
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
