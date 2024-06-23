import React from 'react';

import { Transaction } from 'src/features/transactions/model/transactionModel';

import { formatDate } from 'src/lib/utils/formatDate';

import { Loan } from '../model/loanModel';

interface DataProps {
    transactionData: Transaction[];
    loansData: Loan[];
    addTransaction: (transaction: TransactionProps) => void;
    userId: number;
}

interface TransactionProps {
    amount: number;
    description: string;
    category: string;
    type: string;
    userId: number;
    date: Date;
    recurring: boolean;
}

const addLoanToTransaction = ({ transactionData, loansData, addTransaction, userId }: DataProps) => {
    const currentYear = formatDate({ date: new Date(), format: 'YYYY' });
    const currentMonth = formatDate({ date: new Date(), format: 'MM' });

    // Filter transactions that are loans
    const filteredTransactions = transactionData?.filter((transaction: Transaction) => transaction.category === 'loan');

    // Iterate over loans
    loansData?.forEach((loan: Loan) => {
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
                    userId: userId,
                    date: new Date(`${currentYear}-${currentMonth}-${loanDay}`),
                    recurring: true,
                });
            }
        }
    });
};

export default addLoanToTransaction;
