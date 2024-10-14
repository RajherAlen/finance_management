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

const addLoanToTransaction = ({ transactionData, loansData, addTransaction, userId, notifications }: DataProps) => {
    const currentYear = formatDate({ date: new Date(), format: 'YYYY' });
    const currentMonth = formatDate({ date: new Date(), format: 'MM' });
    const currentDay = formatDate({ date: new Date(), format: 'DD' });
    let notificationMessage: string;

    const filteredTransactions = transactionData?.filter((transaction: Transaction) => transaction.category === 'loan');

    let notificationData = null;

    loansData?.forEach((loan: Loan) => {
        const loanYear = String(loan.endDate).split('-')[0];
        const loanDay = String(loan.endDate).split('-')[2];

        if (currentYear <= loanYear && currentDay >= loanDay) {
            const loanData = {
                amount: loan.instalmentAmount,
                description: `loan-${loan.name}`,
                category: 'loan',
                type: 'expense',
                userId: userId,
                date: new Date(`${currentYear}-${currentMonth}-${loanDay}`),
                recurring: true,
            };

            if (filteredTransactions?.length === 0) {
                addTransaction({ data: loanData, userId: userId });
            }

            if (filteredTransactions && filteredTransactions.length > 0) {
                const transactionExists = filteredTransactions.find(
                    (transaction: Transaction) =>
                        transaction.description === `loan-${loan.name}` &&
                        String(transaction.date).split('T')[0] === `${currentYear}-${currentMonth}-${loanDay}`
                );

                if (!transactionExists) {
                    addTransaction({ data: loanData, userId: userId });
                }

                const { isCompleted } = checkIsLoanCompleted({
                    startDate: loan.startDate,
                    endDate: loan.endDate,
                    totalInstalments: loan.totalInstalments,
                });

                if (isCompleted) {
                    notificationMessage = `Your loan (${loan.name}) of ${formatCurrency(loan.totalAmount)} has been completed.`;

                    const filteredData = notifications && notifications.filter((notification: NotificationProps) => !notification.isRead);
                    
                    if (filteredData && filteredData.length > 0) {
                        const notificationExists = filteredData?.find(
                            (notification: NotificationProps) => notification.description === notificationMessage
                        );

                        if (!notificationExists) {
                            notificationData = {
                                userId,
                                title: 'Loan Completed',
                                description: notificationMessage,
                            };
                        }
                    }
                }
            }
        }
    });

    return { notificationData };
};
export default addLoanToTransaction;
