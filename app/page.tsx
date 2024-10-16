'use client';

import { useEffect } from 'react';

import TransactionListDisplay from 'src/features/transactions/components/TransactionListDisplay';

import { useGetLoansQuery } from 'src/features/loans/api/loansApi';
import addLoanToTransaction from 'src/features/loans/utils/addLoanToTransaction';
import addRecurringTransaction from 'src/features/loans/utils/addRecurringTransaction';
import { useSendNotificationMutation } from 'src/features/notification/api/notificationApi';
import { setNotifications } from 'src/features/notification/notificationSlice';
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
    const [sendNotification] = useSendNotificationMutation();

    const { userInfo } = useAppSelector((state) => state.authStore);
    const { notifications } = useAppSelector((state) => state.notificationStore);

    const { data: transactionsData } = useGetThisMonthTransactionsQuery(userInfo?.id);
    const { data: savingsData } = useGetSavingsQuery(userInfo?.id);
    const { data: loansData } = useGetLoansQuery(userInfo?.id);
    const { data: recurringData } = useGetLastMonthRecurringTransactionsQuery(userInfo?.id);

    // Helper function to handle recurring transactions
    const handleRecurringTransactions = () => {
        if (!recurringData || !userInfo) return;

        addRecurringTransaction({
            recurringData: recurringData.transactions,
            userId: userInfo.id,
            currentMonthData: transactionsData?.transactions,
            addTransaction,
        });
    };

    // Helper function to handle loan transactions and notifications
    const handleLoanTransactions = () => {
        if (!loansData || !userInfo) return;

        const { notificationData } = addLoanToTransaction({
            transactionData: transactionsData?.transactions,
            loansData: loansData.loans,
            addTransaction,
            userId: userInfo.id,
            notifications,
        });

        if (notificationData) {
            sendNotification(notificationData);
            dispatch(setNotifications(notificationData));
        }
    };

    useEffect(() => {
        if (!userInfo) return;

        // Update savings and income
        dispatch(updateSaving(savingsData?.savings));
        dispatch(setTotalIncome(userInfo.income));

        // Handle recurring and loan transactions
        handleRecurringTransactions();
        handleLoanTransactions();

        // Fetch all transactions
        dispatch(getAllTransactions(transactionsData?.transactions));
    }, [userInfo, transactionsData, loansData, savingsData, recurringData]);

    return <TransactionListDisplay />;
};

export default Dashboard;
