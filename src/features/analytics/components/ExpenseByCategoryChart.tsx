'use client';

import React from 'react';

import { useAppSelector } from 'src/store/hooks';

const ExpenseByCategoryChart = () => {
    const { transactions } = useAppSelector((state) => state.transactionStore);

    if (!transactions) return null;

    return <div>BUBBLE CHART</div>;
};

export default ExpenseByCategoryChart;
