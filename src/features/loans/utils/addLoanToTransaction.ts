import { Transaction } from 'src/features/transactions/model/transactionModel';

import { formatDate } from 'src/lib/utils/formatDate';

import { Loan } from '../model/loanModel';

interface DataProps {
    transactionData: Transaction[];
    loansData: Loan[];
    addTransaction: ({ data, userId }: { data: TransactionProps; userId: number }) => void;
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
    const currentDay = formatDate({ date: new Date(), format: 'DD' });

    const filteredTransactions = transactionData?.filter((transaction: Transaction) => transaction.category === 'loan');

    loansData?.forEach((loan: Loan) => {
        const loanYear = String(loan.endDate).split('-')[0];
        const loanDay = String(loan.endDate).split('-')[2];

        // Check if the loan should be added for the current month and year
        if (currentYear <= loanYear && currentDay >= loanDay) {
            const loanData = {
                amount: loan.instalmentAmount,
                // TODO: change this description/name
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

            // Check if transaction already exists for this loan in current month
            if (filteredTransactions && filteredTransactions.length > 0) {
                const transactionExists = filteredTransactions.find(
                    (transaction: Transaction) =>
                        transaction.description === `loan-${loan.name}` &&
                        String(transaction.date).split('T')[0] === `${currentYear}-${currentMonth}-${loanDay}`
                );

                // If transaction does not exist, add it
                if (!transactionExists) {
                    addTransaction({ data: loanData, userId: userId });
                }
            }
        }
    });
};
export default addLoanToTransaction;
