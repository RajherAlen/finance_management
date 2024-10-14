import { format, startOfDay, subMonths } from 'date-fns';

export const filterLastTransactions = (transactions: any[], months = 3) => {
    const now = new Date();
    const threeMonthsAgo = subMonths(startOfDay(now), months);

    const filtered = transactions.filter((transaction) => {
        const transactionDate = new Date(transaction.date);
        return transactionDate >= threeMonthsAgo && transactionDate <= now;
    });

    const groupedByMonth = filtered.reduce((acc, transaction) => {
        const transactionDate = new Date(transaction.date);
        const monthKey = format(transactionDate, 'yyyy-MM'); // e.g., '2024-07'

        if (!acc[monthKey]) {
            acc[monthKey] = { wants: 0, needs: 0, savings: 0, loan: 0 };
        }

        acc[monthKey][transaction.category] += transaction.amount;
        return acc;
    }, {} as Record<string, { wants: number; needs: number; savings: number; loan: number }>);

    return groupedByMonth;
};

export default filterLastTransactions;