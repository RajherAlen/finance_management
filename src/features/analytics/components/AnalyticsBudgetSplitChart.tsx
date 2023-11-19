'use client'


import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "src/store/hooks";


import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { updateCategoryTotal, setTotalIncome } from "src/features/transactions/transactionSlice";
import Card from "src/components/card/Card";
import formatCurrency from "src/lib/utils/formatCurrency";

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
    responsive: true,
    elements: {
        line: {
            tension: 0.3
        }
    },
    plugins: {
        legend: {
            position: "right" as const
        },
        title: {
            display: true
        }
    }
};


const AnalyticsBudgetSplitChart = () => {
    const dispatch = useAppDispatch();
    const { category: {
        needs, wants, savings
    } } = useAppSelector((state) => state.transactionStore);

    const labels = [
        `${formatCurrency(needs)} - Needs`,
        `${formatCurrency(wants)} - Wants`,
        `${formatCurrency(savings)} - Savings`
    ];

    const updateTotal = () => {
        dispatch(setTotalIncome(1650));
    }

    const data = {
        labels,
        datasets: [
            {
                data: [needs, wants, savings],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1,
            },
        ]
    };

    return (
        <Card className="w-[400px]">
            <Doughnut options={options} data={data} /> <button onClick={updateTotal}>UPDATE</button>
        </Card>
    )
}

export default AnalyticsBudgetSplitChart