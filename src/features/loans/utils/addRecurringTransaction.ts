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
    addTransaction: ({ data, userId }: { data: TransactionProps; userId: number }) => void;
}

export const addRecurringTransaction = ({ recurringData, userId, currentMonthData, addTransaction }: RecurringTransactionProps) => {
    const currentYear = formatDate({ date: new Date(), format: 'YYYY' });
    const currentMonth = formatDate({ date: new Date(), format: 'MM' });
    const currentDay = formatDate({ date: new Date(), format: 'DD' });

    const filteredPreviousMonthTransactions = recurringData?.filter(
        (transaction: Transaction) => transaction.recurring === true && transaction.category !== 'loan'
    );
    const filteredCurrentMonthTransactions = currentMonthData?.filter(
        (transaction: Transaction) => transaction.recurring === true && transaction.category !== 'loan'
    );

    const transactionExistsInCurrentMonth = (previousTransaction: Transaction, currentTransactions: Transaction[]): boolean =>
        currentTransactions?.some((current) => current.description === previousTransaction.description);

    filteredPreviousMonthTransactions?.forEach((previousTransaction: Transaction) => {
        if (transactionExistsInCurrentMonth(previousTransaction, filteredCurrentMonthTransactions)) return;

        const transactionDay = String(previousTransaction.date).split('T')[0].split('-')[2];

        if (currentDay >= transactionDay) {
            const transactionData: TransactionProps = {
                amount: previousTransaction.amount,
                description: previousTransaction.description,
                category: previousTransaction.category,
                type: 'expense',
                userId,
                date: new Date(`${currentYear}-${currentMonth}-${transactionDay}`),
                recurring: true,
            };

            addTransaction({ data: transactionData, userId });
        }
    });
};

export default addRecurringTransaction;
