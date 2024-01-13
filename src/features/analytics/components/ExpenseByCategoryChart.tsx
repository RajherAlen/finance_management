'use client';

import React from 'react';

import CustomBubbleChart from 'src/components/charts/BubbleChart';

import { useAppSelector } from 'src/store/hooks';

const ExpenseByCategoryChart = () => {
    const { transactions } = useAppSelector((state) => state.transactionStore);

    return (
        <div>
            <p className="mb-5 text-xl font-semibold">Expenses by category</p>
            <div className="flex justify-center p-5">
                <CustomBubbleChart data={transactions} />
            </div>
        </div>
    );
};

export default ExpenseByCategoryChart;
