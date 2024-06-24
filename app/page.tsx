'use client';

import { useEffect } from 'react';

import TransactionListDisplay from 'src/features/transactions/components/TransactionListDisplay';

import { useGetLoansQuery } from 'src/features/loans/api/loansApi';
import addLoanToTransaction from 'src/features/loans/utils/addLoanToTransaction';
import { useGetSavingsQuery } from 'src/features/savings/api/savingsApi';
import { useAddTransactionMutation, useGetThisMonthTransactionsQuery } from 'src/features/transactions/api/transactionsApi';
import { filterThisMonthTransactions, getAllTransactions, setTotalIncome, updateSaving } from 'src/features/transactions/transactionSlice';

import { useAppDispatch, useAppSelector } from 'src/store/hooks';

const Dashboard = () => {
    const dispatch = useAppDispatch();
    const [addTransaction] = useAddTransactionMutation();

    const { userInfo } = useAppSelector((state) => state.authStore);
    const { data } = useGetThisMonthTransactionsQuery(userInfo?.id);
    const { data: savingData } = useGetSavingsQuery(userInfo?.id);
    const { data: loansData, isLoading: loansLoading } = useGetLoansQuery(userInfo?.id);

    useEffect(() => {
        dispatch(setTotalIncome(userInfo?.income));
        dispatch(updateSaving(savingData?.savings));

        addLoanToTransaction({
            transactionData: data?.transactions,
            loansData: loansData?.loans,
            addTransaction,
            userId: userInfo?.id,
        });

        dispatch(getAllTransactions(data?.transactions));
    }, [userInfo, data, loansData, dispatch, savingData]);

    return <TransactionListDisplay />;
};

export default Dashboard;
