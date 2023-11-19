"use client";

import React from "react";
import { useAppSelector } from "src/store/hooks";

import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

import Card from "src/components/card/Card";
import formatCurrency from "src/lib/utils/formatCurrency";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

export const options = {
	responsive: true,
	plugins: {
		legend: {
			position: "top" as const
		},
		title: {
			display: false
		}
	}
};

const AnalyticsBudgetSplitChart = () => {
	const {
		spendByCategory,
		budgetCategory: { needs, wants, savings }
	} = useAppSelector((state) => state.transactionStore);

	if (!spendByCategory) return null;

	const labels = [
		`${formatCurrency(needs)} - Needs`,
		`${formatCurrency(wants)} - Wants`,
		`${formatCurrency(savings)} - Savings`
	];

	const data = {
		labels,
		datasets: [
			{
				label: "Budget",
				data: [needs, wants, savings],
				backgroundColor: "rgba(16, 185, 129, 0.5)"
			},
			{
				label: "Spent",
				data: [
					spendByCategory.needs,
					spendByCategory.wants,
					spendByCategory.savings
				],
				backgroundColor: "rgba(239, 68, 68, 0.5)"
			}
		]
	};

	return (
		<div>
			<p className="font-semibold text-sm text-gray-700 mb-2">
				Budget vs Actual
			</p>
			<Card>
				<Bar options={options} data={data} />
			</Card>
		</div>
	);
};

export default AnalyticsBudgetSplitChart;
