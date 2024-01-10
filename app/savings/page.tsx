'use client';

import React from 'react';

import Card from 'src/components/card/Card';

import { SavingsListDisplay } from 'src/features/savings';

import formatCurrency from 'src/lib/utils/formatCurrency';
import { useAppSelector } from 'src/store/hooks';

const Savings = () => {
    const { totalSavings } = useAppSelector((state) => state.transactionStore);

    return (
        <div className="flex gap-10">
            <div className="w-full">
                <SavingsListDisplay />
            </div>

            <div className="w-[400px]">
                <Card className='text-center'>
                    <p className="text-sm font-semibold text-gray-700">You Saved</p>
                    <p className="text-3xl font-bold">{formatCurrency(totalSavings)}</p>
                </Card>
            </div>
        </div>
    );
};

export default Savings;
