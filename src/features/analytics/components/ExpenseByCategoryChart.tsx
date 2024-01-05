'use client';

import React from 'react';

import BubbleChart from '@weknow/react-bubble-chart-d3';
import { useAppSelector } from 'src/store/hooks';

const ExpenseByCategoryChart = () => {
    const { transactions } = useAppSelector((state) => state.transactionStore);

    if (!transactions) return null;

    return (
        <div>
            <p className="mb-2 text-xl font-semibold">Expenses by category</p>
            <BubbleChart
                width={600}
                height={600}
                padding={0}
                graph={{
                    zoom: 0.8,
                    offsetX: -0.05,
                    offsetY: -0.01,
                }}
                showLegend={false}
                fontFamily="Arial"
                valueFont={{
                    family: 'Arial',
                    size: 16,
                    color: '#fff',
                }}
                labelFont={{
                    family: 'Arial',
                    size: 11,
                    color: '#fff',
                    weight: 'normal'
                }}
                data={transactions.map((transaction) => {
                    return {
                        label: transaction.description,
                        value: transaction.amount,
                    };
                })}
            />
        </div>
    );
};

export default ExpenseByCategoryChart;
