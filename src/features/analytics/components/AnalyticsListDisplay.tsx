import React from 'react'
import AnalyticsBudgetSplitChart from "./AnalyticsBudgetSplitChart";
import AnalyticsBudgetList from './AnalyticsBudgetList';

const AnalyticsListDisplay = () => {
	return (
		<div className='max-w-[600px]'>
			{/* <AnalyticsBudgetList /> */}
			<AnalyticsBudgetSplitChart />
		</div>
	)
};

export default AnalyticsListDisplay;
