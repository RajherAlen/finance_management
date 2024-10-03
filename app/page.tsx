'use client';

import { useEffect } from 'react';

import TransactionListDisplay from 'src/features/transactions/components/TransactionListDisplay';

import { useGetLoansQuery } from 'src/features/loans/api/loansApi';
import { Loan } from 'src/features/loans/model/loanModel';
import addLoanToTransaction from 'src/features/loans/utils/addLoanToTransaction';
import addRecurringTransaction from 'src/features/loans/utils/addRecurringTransaction';
import { checkIsLoanCompleted } from 'src/features/loans/utils/checkIsLoanCompleted';
import { useGetNotificationsQuery, useSendNotificationMutation } from 'src/features/notification/api/notificationApi';
import { NotificationProps } from 'src/features/notification/model/notificationModel';
import { setNotifications } from 'src/features/notification/notificationSlice';
import { useGetSavingsQuery } from 'src/features/savings/api/savingsApi';
import {
    useAddTransactionMutation,
    useGetLastMonthRecurringTransactionsQuery,
    useGetThisMonthTransactionsQuery,
} from 'src/features/transactions/api/transactionsApi';
import { getAllTransactions, setTotalIncome, updateSaving } from 'src/features/transactions/transactionSlice';

import formatCurrency from 'src/lib/utils/formatCurrency';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

const Dashboard = () => {
    const dispatch = useAppDispatch();
    const [addTransaction] = useAddTransactionMutation();

    const { userInfo } = useAppSelector((state) => state.authStore);
    const { data } = useGetThisMonthTransactionsQuery(userInfo?.id);
    const { data: savingData } = useGetSavingsQuery(userInfo?.id);
    const { data: loansData } = useGetLoansQuery(userInfo?.id);
    const { notifications } = useAppSelector((state) => state.notificationStore);

    // get recurring data from last month
    const { data: recurringData } = useGetLastMonthRecurringTransactionsQuery(userInfo?.id);
    const [sendNotification] = useSendNotificationMutation();

    useEffect(() => {
        dispatch(updateSaving(savingData?.savings));
        dispatch(setTotalIncome(userInfo?.income));

        if (userInfo) {
            if (recurringData) {
                addRecurringTransaction({
                    recurringData: recurringData?.transactions,
                    userId: userInfo.id,
                    currentMonthData: data?.transactions,
                    addTransaction,
                });
            }

            if (loansData) {
                const { notificationData } = addLoanToTransaction({
                    transactionData: data?.transactions,
                    loansData: loansData?.loans,
                    addTransaction,
                    userId: userInfo.id,
                    notifications: notifications,
                });

                if (notificationData) {
                    sendNotification(notificationData);
                    dispatch(setNotifications(notificationData));
                }
            }
        }

        dispatch(getAllTransactions(data?.transactions));
    }, [userInfo, data, loansData, dispatch, savingData, recurringData]);

    return <TransactionListDisplay />;
};

export default Dashboard;
