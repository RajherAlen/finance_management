'use client';

import React from 'react';

import EmptyState from 'src/components/card/EmptyState';
// import CustomBubbleChart from 'src/components/charts/BubbleChart';

import { useAppSelector } from 'src/store/hooks';

const ExpenseByCategoryChart = () => {
    const { transactions } = useAppSelector((state) => state.transactionStore);
    return null;
    if (transactions.length === 0) return <EmptyState title="No Transactions Yet" />;

    return (
        <div>
            <p className="mb-5 text-xl font-semibold">Expenses by category</p>
            <div className="flex justify-center p-5">{/* <CustomBubbleChart data={transactions} /> */}</div>
        </div>
    );
};

export default ExpenseByCategoryChart;
