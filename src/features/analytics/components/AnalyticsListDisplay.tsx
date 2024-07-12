import React from 'react';

import BudgetProgressList from 'src/features/transactions/components/BudgetProgressList';

import AnalyticsBudgetSplitChart from './AnalyticsBudgetSplitChart';
import ExpenseByCategoryChart from './ExpenseByCategoryChart';
import TotalSpentChart from './TotalSpentChart';

const AnalyticsListDisplay = () => {
    return (
        <div className="flex flex-col gap-5">
            {/* <div className="grid grid-cols-2 gap-4">
                <ExpenseByCategoryChart />
                <TotalSpentChart />
            </div> */}

            <div className="flex flex-wrap items-start gap-5">
                {/* <AnalyticsBudgetList /> */}
                <AnalyticsBudgetSplitChart />

                <BudgetProgressList />
            </div>
        </div>
    );
};

export default AnalyticsListDisplay;
