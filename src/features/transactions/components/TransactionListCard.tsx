'use client';

import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'src/store/hooks';

import { setTotalIncome } from '../transactionSlice';
import AddIncomeModal from './AddIncomeModal';
import TransactionCard from './TransactionCard';

const TransactionListCard = () => {
    const { income, totalExpense, totalSavings } = useAppSelector((state) => state.transactionStore);
    const { userInfo } = useAppSelector((state) => state.authStore);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (userInfo.income) {
            dispatch(setTotalIncome(userInfo.income));
        }
    }, []);

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
