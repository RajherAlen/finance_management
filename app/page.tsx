'use client';

import { useEffect } from 'react';

import TransactionListDisplay from 'src/features/transactions/components/TransactionListDisplay';

import { useGetSavingsQuery } from 'src/features/savings/api/savingsApi';
import { useGetTransactionQuery } from 'src/features/transactions/api/transactionsApi';
import { getAllTransactions, setTotalIncome, updateSaving } from 'src/features/transactions/transactionSlice';

import { useAppDispatch, useAppSelector } from 'src/store/hooks';

const Dashboard = () => {
    const dispatch = useAppDispatch();

    const { userInfo } = useAppSelector((state) => state.authStore);
    const { data } = useGetTransactionQuery(userInfo?.id);
    const { data: savingData } = useGetSavingsQuery(userInfo?.id);

    useEffect(() => {
        dispatch(getAllTransactions(data?.transactions));
        dispatch(setTotalIncome(userInfo.income));
        dispatch(updateSaving(savingData?.savings));
    }, [userInfo, data, dispatch, savingData]);

    return <TransactionListDisplay />;
};

export default Dashboard;
