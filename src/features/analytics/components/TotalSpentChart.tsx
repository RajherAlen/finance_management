'use client';

import React from 'react';
import Card from 'src/components/card/Card';

import EmptyState from 'src/components/card/EmptyState';
import CircularChart from 'src/components/charts/CircularChart';
import AddExpenseModal from 'src/features/transactions/components/AddExpenseModal';

import formatCurrency from 'src/lib/utils/formatCurrency';
import { useAppSelector } from 'src/store/hooks';

const TotalSpentChart = () => {
    const { transactions } = useAppSelector((state) => state.transactionStore);

    const essential = transactions
        .filter((item) => item.category === 'needs')
        .reduce((accValue, currentValue) => accValue + currentValue.amount, 0);

    const nonEssential = transactions
        .filter((item) => item.category === 'wants')
        .reduce((accValue, currentValue) => accValue + currentValue.amount, 0);

    const savings = transactions
        .filter((item) => item.category === 'savings')
        .reduce((accValue, currentValue) => accValue + currentValue.amount, 0);

    const data = [
        { title: 'Essential', value: essential, color: '#F97939' },
        { title: 'Non-Essential', value: nonEssential, color: '#F8D0A0' },
        { title: 'Savings', value: savings, color: '#4A9285' },
    ];

    if (transactions.length === 0) return <EmptyState title='No Transactions Yet' />;

    return (
        <div className='flex flex-col'>
            <p className='mb-2 text-sm font-semibold text-gray-700'>Total Spent by Category</p>
            <Card className='flex h-full flex-col items-center justify-center'>
                <div className='mb-5 h-[220px] w-[220px]'>
                    <CircularChart data={data} />
                </div>

                <div className='flex gap-4'>
                    {data.map((item) => {
                        return (
                            <div key={item.title}>
                                <div className='flex flex-wrap items-center gap-1'>
                                    <p className='h-3 w-3 rounded-full' style={{ backgroundColor: item.color }}></p>
                                    <p className='text-sm font-medium'>{item.title}</p>
                                    <p className='text-center text-[10px]'>({formatCurrency(item.value)})</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Card>
        </div>
    );
};

export default TotalSpentChart;
