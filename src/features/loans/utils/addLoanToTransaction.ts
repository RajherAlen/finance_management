import { NotificationProps } from 'src/features/notification/model/notificationModel';
import { Transaction } from 'src/features/transactions/model/transactionModel';

import formatCurrency from 'src/lib/utils/formatCurrency';
import { formatDate } from 'src/lib/utils/formatDate';

import { Loan } from '../model/loanModel';
import { checkIsLoanCompleted } from './checkIsLoanCompleted';

interface DataProps {
    transactionData: Transaction[];
    loansData: Loan[];
    addTransaction: ({ data, userId }: { data: TransactionProps; userId: number }) => void;
    userId: number;
    notifications: NotificationProps[];
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

// Helper function to create a new loan transaction
const createLoanTransaction = (loan: Loan, userId: number, date: string): TransactionProps => ({
    amount: loan.instalmentAmount,
    description: `loan-${loan.name}`,
    category: 'loan',
    type: 'expense',
    userId,
    date: new Date(date),
    recurring: true,
});

// Helper function to check if a transaction already exists
const transactionExists = (transactions: Transaction[], loan: Loan, year: string, month: string, day: string) =>
    transactions?.some(
        (transaction: Transaction) =>
            transaction.description === `loan-${loan.name}` && String(transaction.date).split('T')[0] === `${year}-${month}-${day}`
    );

// Helper function to check if a notification already exists
const notificationExists = (notifications: NotificationProps[], message: string) =>
    notifications?.some((notification: NotificationProps) => notification.description === message && !notification.isRead);

const addLoanToTransaction = ({ transactionData, loansData, addTransaction, userId, notifications }: DataProps) => {
    const currentDate = new Date();
    const currentYear = formatDate({ date: currentDate, format: 'YYYY' });
    const currentMonth = formatDate({ date: currentDate, format: 'MM' });
    const currentDay = formatDate({ date: currentDate, format: 'DD' });

    let notificationData: NotificationProps | null = null;

    loansData.forEach((loan: Loan) => {
        const [loanYear, , loanDay] = String(loan.endDate).split('-');

        if (currentYear <= loanYear && currentDay >= loanDay) {
            const loanData = createLoanTransaction(loan, userId, `${currentYear}-${currentMonth}-${loanDay}`);

            // Check if the loan is completed
            const { isCompleted } = checkIsLoanCompleted({
                startDate: loan.startDate,
                endDate: loan.endDate,
                totalInstalments: loan.totalInstalments,
            });

            if (isCompleted) {
                const notificationMessage = `Your loan (${loan.name}) of ${formatCurrency(loan.totalAmount)} has been completed.`;

                const filteredData = notifications && notifications.filter((notification: NotificationProps) => !notification.isRead);

                if (filteredData?.length === 0) {
                    return null;
                }

                // Add notification if it doesn't exist
                if (!notificationExists(notifications, notificationMessage)) {
                    notificationData = {
                        userId,
                        title: 'Loan Completed',
                        description: notificationMessage,
                        isRead: false, // Assuming new notifications are unread by default
                    };
                }
            }

            // Add transaction if it doesn't exist
            if (!transactionExists(transactionData, loan, currentYear, currentMonth, loanDay)) {
                addTransaction({ data: loanData, userId });
            }
        }
    });

    return { notificationData };
};

export default addLoanToTransaction;
