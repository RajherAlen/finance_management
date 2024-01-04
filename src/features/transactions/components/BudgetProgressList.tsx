'use client';

import React from 'react';

import Card from 'src/components/card/Card';
import { ProgressBar } from 'src/components/progress/ProgressBar';
import Title from 'src/components/text/Title';

import { calcPercentage } from 'src/lib/utils/calcPercentage';
import { useAppSelector } from 'src/store/hooks';

const BudgetProgressList = () => {
    const {
        budgetCategory,
        spendByCategory: { needs, wants, savings },
    } = useAppSelector((store) => store.transactionStore);

    if (!budgetCategory) return null;

    return (
        <div className="flex min-w-[300px] max-w-[50%] flex-1 flex-col">
            <Title>Budget split (50, 30, 20)</Title>
            <Card className="flex flex-1 flex-col gap-5">
                <ProgressBar value={needs} label="Needs" total={budgetCategory.needs} />
                <ProgressBar value={wants} label="Wants" total={budgetCategory.wants} />
                <ProgressBar value={savings} label="Savings" total={budgetCategory.savings} />
            </Card>
        </div>
    );
};

export default BudgetProgressList;
