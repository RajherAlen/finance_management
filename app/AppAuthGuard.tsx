'use client';

import React, { useEffect, useState } from 'react';

import GlobalLoader from 'src/components/loader/GlobalLoader';

import { useGetSavingsQuery } from 'src/features/savings/api/savingsApi';
import { useGetTransactionQuery } from 'src/features/transactions/api/transactionsApi';
import { getAllTransactions, updateSaving, updateTotalExpense } from 'src/features/transactions/transactionSlice';

import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

const AppAuthGuard = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    const authStore = useAppSelector((state) => state.authStore);
    const { userInfo } = useAppSelector((state) => state.authStore);
    const dispatch = useAppDispatch();

    const { data } = useGetTransactionQuery(userInfo?.id);
    const { data: savingData } = useGetSavingsQuery(userInfo?.id);

    useEffect(() => {
        if (!authStore.userInfo && !authStore.userToken) {
            return router.push('/login');
        }

        dispatch(getAllTransactions(data?.transactions));
        dispatch(updateSaving(savingData?.savings));
        dispatch(updateTotalExpense());

        setIsLoading(false);
    }, [authStore.userInfo, authStore.userToken, router, data, dispatch, savingData]);

    if (isLoading) return <GlobalLoader />;

    return <>{children}</>;
};

export default AppAuthGuard;
