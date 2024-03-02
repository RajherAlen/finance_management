'use client';

import React from 'react';

import CircularChart from 'src/components/charts/CircularChart';

import { cn } from 'src/lib/utils/cn';
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

    const data = [
        { title: 'Essential', value: essential, color: '#F97939' },
        { title: 'Non-Essential', value: nonEssential, color: '#F8D0A0' },
        { title: 'Savings', value: 300, color: '#4A9285' },
    ];

    return (
        <div>
            <p className="mb-5 text-xl font-semibold">Total Spent</p>

            <div className="flex flex-col items-center justify-center h-full">
                <div className="mb-5 h-[220px] w-[220px]">
                    <CircularChart data={data} />
                </div>

                <div className="flex gap-4">
                    {data.map((item) => {
                        return (
                            <div key={item.title}>
                                <div className="flex items-center gap-1 flex-wrap">
                                    <p className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }}></p>
                                    <p className="text-sm font-medium">{item.title}</p>
                                    <p className="text-center text-[10px]">({formatCurrency(item.value)})</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default TotalSpentChart;
