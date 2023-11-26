import React from 'react'
import AnalyticsBudgetSplitChart from "./AnalyticsBudgetSplitChart";
import AnalyticsBudgetList from './AnalyticsBudgetList';
import BudgetProgressList from 'src/features/transactions/components/BudgetProgressList';

const AnalyticsListDisplay = () => {
	return (
		<div className='flex gap-5 items-start flex-wrap'>
			{/* <AnalyticsBudgetList /> */}
			<AnalyticsBudgetSplitChart />
			
			<BudgetProgressList />
		</div>
	)
};

export default AnalyticsListDisplay;
