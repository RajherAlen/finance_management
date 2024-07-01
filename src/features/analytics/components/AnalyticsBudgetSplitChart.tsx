'use client';

import React from 'react';
import { Bar } from 'react-chartjs-2';

import Card from 'src/components/card/Card';

import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import formatCurrency from 'src/lib/utils/formatCurrency';
import { useAppSelector } from 'src/store/hooks';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: false,
        },
    },
};

const AnalyticsBudgetSplitChart = () => {
    const { transactions, budgetCategory: { needs, wants, savings }, } = useAppSelector((state) => state.transactionStore);

    const needsSpent = transactions.filter((item) => item.category === 'needs').reduce((accValue, currentValue) => accValue + currentValue.amount, 0);
    const wantsSpent = transactions.filter((item) => item.category === 'wants').reduce((accValue, currentValue) => accValue + currentValue.amount, 0);
    const savingsSpent = transactions.filter((item) => item.category === 'savings').reduce((accValue, currentValue) => accValue + currentValue.amount, 0);

    const labels = [`${formatCurrency(needs)} - Needs`, `${formatCurrency(wants)} - Wants`, `${formatCurrency(savings)} - Savings`];

    const data = {
        labels,
        datasets: [
            {
                label: 'Budget',
                data: [needs, wants, savings],
                backgroundColor: 'rgba(16, 185, 129, 0.9)',
            },
            {
                label: 'Spent',
                data: [needsSpent, wantsSpent, savingsSpent],
                backgroundColor: 'rgba(244, 63, 94, 0.9)',
            },
        ],
    };

    return (
        <div className="flex-1">
            <p className="mb-2 text-sm font-semibold text-gray-700">Budget vs Actual</p>
            <Card>
                <Bar options={options} data={data} />
            </Card>
        </div>
    );
};

export default AnalyticsBudgetSplitChart;
