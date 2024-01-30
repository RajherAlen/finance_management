'use client';

import { useEffect } from 'react';

import TransactionListDisplay from 'src/features/transactions/components/TransactionListDisplay';

import { useAddTransactionMutation, useGetTransactionQuery } from 'src/features/transactions/api/transactionsApi';
import { Transaction } from 'src/features/transactions/model/transactionModel';
import { getAllTransactions, updateTotalExpense } from 'src/features/transactions/transactionSlice';

import { useAppDispatch, useAppSelector } from 'src/store/hooks';

const Dashboard = () => {
    const { userInfo } = useAppSelector((state) => state.authStore);
    const dispatch = useAppDispatch();

    const { data, isLoading } = useGetTransactionQuery(userInfo?.id);

    useEffect(() => {
        dispatch(getAllTransactions(data?.transactions));
        dispatch(updateTotalExpense());
    }, [isLoading, data]);

    return <TransactionListDisplay />;
};

export default Dashboard;
