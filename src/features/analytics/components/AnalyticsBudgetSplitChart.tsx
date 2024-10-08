import React from 'react';
import { Bar } from 'react-chartjs-2';

import Card from 'src/components/card/Card';

import { CategoryTotals, Transaction } from 'src/features/transactions/model/transactionModel';

import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import formatCurrency from 'src/lib/utils/formatCurrency';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface AnalyticsBudgetSplitChartProps {
    transactions: Transaction[];
    budgetCategory: CategoryTotals;
}

const AnalyticsBudgetSplitChart = ({ transactions, budgetCategory }: AnalyticsBudgetSplitChartProps) => {
    const { needs, wants, savings } = budgetCategory;

    const needsSpent = transactions
        .filter((item) => item.category === 'needs' || item.category === 'loan')
        .reduce((accValue, currentValue) => accValue + currentValue.amount, 0);
    const wantsSpent = transactions
        .filter((item) => item.category === 'wants')
        .reduce((accValue, currentValue) => accValue + currentValue.amount, 0);
    const savingsSpent = transactions
        .filter((item) => item.category === 'savings')
        .reduce((accValue, currentValue) => accValue + currentValue.amount, 0);

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
        <div className='flex-1'>
            <p className='mb-2 text-sm font-semibold text-gray-700'>Budget vs Actual</p>
            <Card>
                <Bar
                    options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top' as const,
                            },
                            title: {
                                display: false,
                            },
                        },
                    }}
                    data={data}
                />
            </Card>
        </div>
    );
};

export default AnalyticsBudgetSplitChart;
