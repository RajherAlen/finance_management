import React from 'react';

import BudgetProgressList from 'src/features/transactions/components/BudgetProgressList';

import AnalyticsBudgetSplitChart from './AnalyticsBudgetSplitChart';

const AnalyticsListDisplay = () => {
    return (
        <div className='flex flex-col gap-5'>
            <div className='flex flex-wrap items-start gap-5'>
                <AnalyticsBudgetSplitChart />

                <BudgetProgressList />
            </div>
        </div>
    );
};

export default AnalyticsListDisplay;
