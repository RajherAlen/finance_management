'use client';

import React from 'react';

import { useAppSelector } from 'src/store/hooks';

import AddIncomeModal from './AddIncomeModal';
import TransactionCard from './TransactionCard';

const TransactionListCard = () => {
    const { income, totalExpense, totalSavings } = useAppSelector((state) => state.transactionStore);

    return (
        <div className="flex flex-wrap gap-3">
            <TransactionCard amount={income} type="income" additionalAction={<AddIncomeModal />} />
            <TransactionCard amount={totalExpense} type="expense" />
            <TransactionCard amount={totalSavings} type="savings" />
            <TransactionCard amount={income - totalExpense} type="budget" />
        </div>
    );
};

export default TransactionListCard;
