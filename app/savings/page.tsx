'use client';

import React, { useEffect } from 'react';

import Card from 'src/components/card/Card';
import { Progress } from 'src/components/progress/ProgressBar';
import Separator from 'src/components/separator/Separator';

import { SavingsListDisplay } from 'src/features/savings';
import { useGetSavingsQuery } from 'src/features/savings/api/savingsApi';
import { updateSaving } from 'src/features/transactions/transactionSlice';

import { calcPercentage } from 'src/lib/utils/calcPercentage';
import formatCurrency from 'src/lib/utils/formatCurrency';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

const Savings = () => {
    const { totalSavings, totalGoalSaving } = useAppSelector((state) => state.transactionStore);
    const { userInfo } = useAppSelector((state) => state.authStore);
    const { data } = useGetSavingsQuery(userInfo?.id);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(updateSaving(data?.savings));
    }, [data, userInfo, dispatch]);

    return (
        <div className="flex h-full items-start gap-10">
            <div className="h-full w-full">
                <SavingsListDisplay />
            </div>

            <Card className="text-center">
                <div className="flex gap-5">
                    <div className="min-w-[200px]">
                        <p className="text-sm font-semibold text-gray-700">You Saved</p>
                        <p className="text-3xl font-bold">{formatCurrency(totalSavings)}</p>
                    </div>

                    <div className="border border-l"></div>

                    <div className="min-w-[200px]">
                        <p className="text-sm font-semibold text-gray-700">Saving Goal</p>
                        <p className="text-3xl font-bold">{formatCurrency(totalGoalSaving)}</p>
                        {totalGoalSaving - totalSavings > 0 && (
                            <p className="text-xs font-semibold text-red-400">-{formatCurrency(totalGoalSaving - totalSavings)}</p>
                        )}
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Savings;
