'use client';

import React from 'react';

import Card from 'src/components/card/Card';

import { LoansListDisplay } from 'src/features/loans';
import { useGetLoansQuery } from 'src/features/loans/api/loansApi';

import { useAppSelector } from 'src/store/hooks';

const Loans = () => {
    const { userInfo } = useAppSelector((state) => state.authStore);
    const { data, isLoading } = useGetLoansQuery(userInfo?.id);

    return (
        <div className="flex h-full items-start gap-10">
            <div className="h-full w-full">
                {!isLoading && data && <LoansListDisplay loans={data?.loans} />}
            </div>

            <Card className="text-center">
                <div className="flex gap-5">
                    <div className="min-w-[200px]">
                        <p className="text-sm font-semibold text-gray-700">You Saved</p>
                        <p className="text-3xl font-bold">Total</p>
                    </div>

                    <div className="border border-l"></div>

                    <div className="min-w-[200px]">
                        <p className="text-sm font-semibold text-gray-700">Saving Goal</p>
                        <p className="text-3xl font-bold">GOAL</p>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Loans;
