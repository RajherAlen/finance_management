'use client';

import React from 'react';

import BubbleChart from '@weknow/react-bubble-chart-d3';
import { useAppSelector } from 'src/store/hooks';

const ExpenseByCategoryChart = () => {
    const { transactions } = useAppSelector((state) => state.transactionStore);

    return (
        <div>
            <p className="mb-5 text-xl font-semibold">Expenses by category</p>
            <div className="flex justify-center p-5">
                <BubbleChart
                    width={400}
                    height={400}
                    graph={{
                        zoom: 0.8,
                        offsetX: .1,
                        offsetY: .05,
                    }}
                    padding={0}
                    showLegend={false}
                    fontFamily="Arial"
                    valueFont={{
                        family: 'Arial',
                        size: 14,
                        color: '#fff',
                    }}
                    labelFont={{
                        family: 'Arial',
                        size: 10,
                        color: '#fff',
                        weight: 'normal',
                    }}
                    data={transactions.map((transaction) => {
                        return {
                            label: transaction.description,
                            value: transaction.amount,
                        };
                    })}
                />
            </div>
        </div>
    );
};

export default ExpenseByCategoryChart;
