import React from 'react';

import BudgetProgressList from 'src/features/transactions/components/BudgetProgressList';

import AnalyticsBudgetList from './AnalyticsBudgetList';
import AnalyticsBudgetSplitChart from './AnalyticsBudgetSplitChart';

const AnalyticsListDisplay = () => {
    return (
        <div className="flex flex-wrap items-start gap-5">
            {/* <AnalyticsBudgetList /> */}
            <AnalyticsBudgetSplitChart />

            <BudgetProgressList />
        </div>
    );
};

export default AnalyticsListDisplay;
