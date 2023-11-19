import React from 'react'
import AnalyticsBudgetSplitChart from "./AnalyticsBudgetSplitChart";
import AnalyticsBudgetList from './AnalyticsBudgetList';

const AnalyticsListDisplay = () => {
	return (
		<div>
			<AnalyticsBudgetList />
			<AnalyticsBudgetSplitChart />
		</div>
	)
};

export default AnalyticsListDisplay;
