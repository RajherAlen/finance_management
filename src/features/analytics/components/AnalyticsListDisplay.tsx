import React from 'react';

import BudgetProgressList from 'src/features/transactions/components/BudgetProgressList';

import { useAppSelector } from 'src/store/hooks';

import AnalyticsBudgetSplitChart from './AnalyticsBudgetSplitChart';

const AnalyticsListDisplay = () => {
    const { transactions, budgetCategory } = useAppSelector((state) => state.transactionStore);

    return (
        <div className='flex flex-col gap-5'>
            <div className='flex flex-wrap items-start gap-5'>
                <AnalyticsBudgetSplitChart transactions={transactions} budgetCategory={budgetCategory} />

                <BudgetProgressList />
            </div>
        </div>
    );
};

export default AnalyticsListDisplay;
