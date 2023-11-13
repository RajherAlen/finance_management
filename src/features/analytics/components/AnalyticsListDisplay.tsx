"use client";

import React from "react";
import { Transaction } from "src/features/transactions/model/transactionModel";
import { useAppSelector } from "src/store/hooks";

import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	Legend
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	Legend
);

export const options = {
	responsive: true,
	elements: {
		line: {
			tension: 0.3
		}
	},
	plugins: {
		legend: {
			position: "bottom" as const
		},
		title: {
			display: true
		}
	}
};

const AnalyticsListDisplay = () => {
	const { transactions } = useAppSelector((state) => state.transactionStore);
	const labels = ["01 Nov", "02 Nov", "03 Nov", "04 Nov"];

	const wants = transactions.map((transaction: any) => {
		if (transaction.category?.toLowerCase() === "wants") {
			return transaction.amount;
		}
	});

	const data = {
		labels,
		datasets: [
			{
				label: "Wants",
				data: transactions
					.filter(
						(transaction: any) =>
							transaction.category?.toLowerCase() === "wants"
					)
					.map((transaction) => {
						return transaction.amount;
					}),
				fill: true,
				borderColor: "rgb(255, 99, 132)",
				backgroundColor: "rgba(255, 99, 132, 0.5)"
			},
			{
				label: "Needs",
				data: transactions
					.filter(
						(transaction: any) =>
							transaction.category?.toLowerCase() === "needs"
					)
					.map((transaction) => {
						return transaction.amount;
					}),
				fill: true,
				borderColor: "rgb(53, 162, 235)",
				backgroundColor: "rgba(53, 162, 235, 0.5)"
			}
		]
	};
	return <Line width={"600px"} options={options} data={data} />;
};

export default AnalyticsListDisplay;
