import React from 'react';

import { useAppSelector } from 'src/store/hooks';

import EditIncomeModal from './EditIncomeModal';
import TransactionCard from './TransactionCard';

const TransactionListCard = () => {
    const store = useAppSelector((state) => state.transactionStore);
    const { income, totalExpense, totalSavings } = store;
    
    return (
        <div className="flex flex-wrap gap-3">
            <TransactionCard amount={income} type="income" additionalAction={<EditIncomeModal />} />
            <TransactionCard amount={totalExpense} type="expense" />
            <TransactionCard amount={totalSavings} type="savings" />
            <TransactionCard amount={income - totalExpense} type="budget" />
        </div>
    );
};

export default TransactionListCard;
