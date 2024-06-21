'use client';

import { useEffect, useState } from 'react';

import TransactionListDisplay from 'src/features/transactions/components/TransactionListDisplay';

import { useGetLoansQuery } from 'src/features/loans/api/loansApi';
import { Loan } from 'src/features/loans/model/loanModel';
import { useGetSavingsQuery } from 'src/features/savings/api/savingsApi';
import { useAddTransactionMutation, useGetThisMonthTransactionsQuery } from 'src/features/transactions/api/transactionsApi';
import { Transaction } from 'src/features/transactions/model/transactionModel';
import { filterThisMonthTransactions, getAllTransactions, setTotalIncome, updateSaving } from 'src/features/transactions/transactionSlice';

import { format } from 'date-fns';
import { formatDate } from 'src/lib/utils/formatDate';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

const Dashboard = () => {
    const dispatch = useAppDispatch();

    const [addTransaction] = useAddTransactionMutation();
    const { userInfo } = useAppSelector((state) => state.authStore);
    const { data } = useGetThisMonthTransactionsQuery(userInfo?.id);
    const { data: savingData } = useGetSavingsQuery(userInfo?.id);
    const { data: loansData, isLoading: loansLoading } = useGetLoansQuery(userInfo?.id);

    useEffect(() => {
        dispatch(setTotalIncome(userInfo.income));
        dispatch(updateSaving(savingData?.savings));

        const currentYear = formatDate({ date: new Date(), format: 'YYYY' });
        const currentMonth = formatDate({ date: new Date(), format: 'MM' });

        // Filter transactions that are loans
        const filteredTransactions = data?.transactions.filter((transaction: Transaction) => transaction.category === 'loan');

        // Iterate over loans
        loansData?.loans.forEach((loan: Loan) => {
            const loanYear = String(loan.endDate).split('-')[0];
            const loanDay = String(loan.endDate).split('-')[2];
            
            // Check if the loan should be added for the current month and year
            if (currentYear <= loanYear) {
                // Check if transaction already exists for this loan in current month
                const transactionExists = filteredTransactions.find(
                    (transaction: Transaction) =>
                        transaction.description === `loan-${loan.name}` &&
                        String(transaction.date).split('T')[0] === `${currentYear}-${currentMonth}-${loanDay}`
                );

                // If transaction does not exist, add it
                if (!transactionExists) {
                    addTransaction({
                        amount: loan.instalmentAmount,
                        // TODO: change this description/name 
                        description: `loan-${loan.name}`,
                        category: 'loan',
                        type: 'expense',
                        userId: userInfo.id,
                        date: new Date(`${currentYear}-${currentMonth}-${loanDay}`),
                        recurring: true,
                    });
                }
            }
        });
        
        dispatch(getAllTransactions(data?.transactions));
    }, [userInfo, data, loansData, dispatch, savingData]);

    return <TransactionListDisplay />;
};

export default Dashboard;
