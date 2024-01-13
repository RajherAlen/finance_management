'use client';

import React from 'react';

import Card from 'src/components/card/Card';

import { SavingsListDisplay } from 'src/features/savings';

import formatCurrency from 'src/lib/utils/formatCurrency';
import { useAppSelector } from 'src/store/hooks';

const Savings = () => {
    const { totalSavings, totalGoalSaving } = useAppSelector((state) => state.transactionStore);

    return (
        <div className="flex items-start gap-10">
            <div className="w-full">
                <SavingsListDisplay />
            </div>

            <Card className="text-center">
                <div className="flex gap-5">
                    <div className='min-w-[200px]'>
                        <p className="text-sm font-semibold text-gray-700">You Saved</p>
                        <p className="text-3xl font-bold">{formatCurrency(totalSavings)}</p>
                    </div>
                    
                    <div className="border border-l"></div>

                    <div className='min-w-[200px]'>
                        <p className="text-sm font-semibold text-gray-700">Saving Goal</p>
                        <p className="text-3xl font-bold">{formatCurrency(totalGoalSaving)}</p>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Savings;
