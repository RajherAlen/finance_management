import { Transaction } from 'src/features/transactions/model/transactionModel';

import { formatDate } from 'src/lib/utils/formatDate';

interface TransactionProps {
    amount: number;
    description: string;
    category: string;
    type: string;
    userId: number;
    date: Date;
    recurring: boolean;
}

interface RecurringTransactionProps {
    recurringData: Transaction[];
    userId: number;
    currentMonthData: Transaction[];
    addTransaction: (transaction: TransactionProps) => void;
}

export const addRecurringTransaction = ({ recurringData, userId, currentMonthData, addTransaction }: RecurringTransactionProps) => {
    const currentYear = formatDate({ date: new Date(), format: 'YYYY' });
    const currentMonth = formatDate({ date: new Date(), format: 'MM' });

    const filteredPreviousMonthTransactions = recurringData?.filter((transaction: Transaction) => transaction.recurring === true);
    const filteredCurrentMonthTransactions = currentMonthData?.filter((transaction: Transaction) => transaction.recurring === true);

    // Function to check if a transaction exists in the current month's transactions
    function transactionExistsInCurrentMonth(previousTransaction: Transaction, currentTransactions: Transaction[]): boolean {
        return currentTransactions.some((currentTransaction) => {
            return currentTransaction.description === previousTransaction.description;
        });
    }

    // Check for each transaction in the previous month if it exists in the current month
    filteredPreviousMonthTransactions?.forEach((previousTransaction: Transaction) => {
        const transactionExists = transactionExistsInCurrentMonth(previousTransaction, filteredCurrentMonthTransactions);
        const transactionDay = String(previousTransaction.date).split('-')[2];

        const transactionData = {
            amount: previousTransaction.amount,
            description: previousTransaction.description,
            category: previousTransaction.category,
            type: 'expense',
            userId: userId,
            date: new Date(`${currentYear}-${currentMonth}-${transactionDay}`),
            recurring: true,
        };

        if (!transactionExists) {
            addTransaction(transactionData);
        }
    });
};

export default addRecurringTransaction;
