'use client';

import { useEffect } from 'react';

import TransactionListDisplay from 'src/features/transactions/components/TransactionListDisplay';

import { useGetLoansQuery } from 'src/features/loans/api/loansApi';
import addLoanToTransaction from 'src/features/loans/utils/addLoanToTransaction';
import { useGetSavingsQuery } from 'src/features/savings/api/savingsApi';
import {
    useAddTransactionMutation,
    useGetLastMonthRecurringTransactionsQuery,
    useGetThisMonthTransactionsQuery,
} from 'src/features/transactions/api/transactionsApi';
import { getAllTransactions, setTotalIncome, updateSaving } from 'src/features/transactions/transactionSlice';

import { useAppDispatch, useAppSelector } from 'src/store/hooks';

const Dashboard = () => {
    const dispatch = useAppDispatch();
    const [addTransaction] = useAddTransactionMutation();

    const { userInfo } = useAppSelector((state) => state.authStore);
    const { data } = useGetThisMonthTransactionsQuery(userInfo?.id);
    const { data: savingData } = useGetSavingsQuery(userInfo?.id);
    const { data: loansData } = useGetLoansQuery(userInfo?.id);

    // get recurring data from last month
    const { data: recudingData } = useGetLastMonthRecurringTransactionsQuery(userInfo?.id);
    // map current month data and find
    // check by name and date is greater or equal than today
    // check if that transaction is added to this month

    useEffect(() => {
        dispatch(updateSaving(savingData?.savings));
        dispatch(setTotalIncome(userInfo?.income));

        if (userInfo) {
            addLoanToTransaction({
                transactionData: data?.transactions,
                loansData: loansData?.loans,
                addTransaction,
                userId: userInfo.id,
            });
        }

        dispatch(getAllTransactions(data?.transactions));
    }, [userInfo, data, loansData, dispatch, savingData]);
    
    return <TransactionListDisplay />;
};

export default Dashboard;
