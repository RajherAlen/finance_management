import TotalSpentChart from 'src/features/analytics/components/TotalSpentChart';

import LastTransactions from './LastTransactions';
import TransactionListCard from './TransactionListCard';

const TransactionListDisplay = () => {
    return (
        <div className='flex flex-wrap gap-5'>
            <div className='flex flex-1 flex-col gap-5'>
                <TransactionListCard />

                {/* <div className="grid grid-cols-2 gap-4">
                    <ExpenseByCategoryChart />
                    <TotalSpentChart />
                    </div> */}
                <TotalSpentChart />
            </div>

            <div className='l-aside flex flex-col'>
                <LastTransactions />
            </div>
        </div>
    );
};

export default TransactionListDisplay;
