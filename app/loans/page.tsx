'use client';

import React from 'react';

import { LoansListDisplay } from 'src/features/loans';
import { useGetLoansQuery } from 'src/features/loans/api/loansApi';

import { useAppSelector } from 'src/store/hooks';

const Loans = () => {
    const { userInfo } = useAppSelector((state) => state.authStore);
    const { data } = useGetLoansQuery(userInfo?.id);

    return (
        <div className="flex h-full items-start gap-10">
            <div className="h-full w-full">
                <LoansListDisplay loans={data?.loans} />
            </div>
        </div>
    );
};

export default Loans;
