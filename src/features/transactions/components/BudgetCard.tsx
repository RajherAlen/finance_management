'use client';

import React from 'react';

import Card from 'src/components/card/Card';

import formatCurrency from 'src/lib/utils/formatCurrency';
import { useAppSelector } from 'src/store/hooks';

const BudgetCard = () => {
    const { income, totalExpense } = useAppSelector((state) => state.transactionStore);

    return (
        <Card className="flex justify-between">
            <div className="flex-1 text-center">
                <p className="text-xs font-semibold uppercase text-muted">Your balance</p>
                <p className="text-sm font-bold">{formatCurrency(income - totalExpense)}</p>
            </div>
        </Card>
    );
};

export default BudgetCard;
