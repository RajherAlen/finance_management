'use client';

import React from 'react';

import Card from 'src/components/card/Card';
import { ProgressBar } from 'src/components/progress/ProgressBar';
import Title from 'src/components/text/Title';

import { calcPercentage } from 'src/lib/utils/calcPercentage';
import { useAppSelector } from 'src/store/hooks';

const BudgetProgressList = () => {
    const {
        transactions,
        budgetCategory,
        spendByCategory: { needs, wants, savings },
    } = useAppSelector((store) => store.transactionStore);

    if (!budgetCategory) return null;

    const needsSpent = transactions.filter((item) => item.category === 'needs' || item.category === 'loan').reduce((accValue, currentValue) => accValue + currentValue.amount, 0);
    const wantsSpent = transactions.filter((item) => item.category === 'wants').reduce((accValue, currentValue) => accValue + currentValue.amount, 0);
    const savingsSpent = transactions.filter((item) => item.category === 'savings').reduce((accValue, currentValue) => accValue + currentValue.amount, 0);

    return (
        <div className="flex min-w-[300px] max-w-[50%] flex-1 flex-col">
            <Title>Budget split (50, 30, 20)</Title>

            <Card className="flex flex-1 flex-col gap-5">
                <ProgressBar hideDifferencValue value={needsSpent} label="Needs" total={budgetCategory.needs} />
                <ProgressBar hideDifferencValue value={wantsSpent} label="Wants" total={budgetCategory.wants} />
                <ProgressBar hideDifferencValue value={savingsSpent} label="Savings" total={budgetCategory.savings} />
            </Card>
        </div>
    );
};

export default BudgetProgressList;
