'use client';

import React, { useState } from 'react';

import Card from 'src/components/card/Card';
import Separator from 'src/components/separator/Separator';
import AddExpense from 'src/features/transactions/components/AddExpense';
import AddIncome from 'src/features/transactions/components/AddIncome';
import LastTransactions from 'src/features/transactions/components/LastTransactions';
import TransactionIcons from 'src/features/transactions/components/TransactionIcons';

import formatCurrency from 'src/lib/utils/formatCurrency';
import { useAppSelector } from 'src/store/hooks';

import OnboardingLayout from './OnboardingLayout';

const OnboardingStep2 = () => {
    const { income } = useAppSelector((state) => state.transactionStore);

    const [checkValidation, setCheckValidation] = useState(false);

    const onSubmit = () => {
        setCheckValidation(true);
    };

    return (
        <OnboardingLayout actionToContinue={onSubmit} formIsValid={income > 0}>
            <p className="mb-8 text-3xl font-bold">Income and Expenses</p>
            <div className="grid h-full grid-cols-2 gap-10">
                <Card variant="outline" radius="xlg" size="xlrg">
                    <p className="mb-4 text-xl font-semibold">Add your income</p>

                    <AddIncome checkValidation={checkValidation} />

                    {income > 0 && (
                        <>
                            <Separator />

                            <div className="mt-5 flex gap-2">
                                <TransactionIcons type="budget" />
                                <div>
                                    <p className="text-sm font-medium">Total Income:</p>
                                    <p className="text-xl font-bold text-emerald-600">{formatCurrency(income)}</p>
                                </div>
                            </div>
                        </>
                    )}
                </Card>

                {/* <Card variant="outline" radius="xlg" size="xlrg">
                    <AddExpense required={false} />

                    <LastTransactions />
                </Card> */}
            </div>
        </OnboardingLayout>
    );
};

export default OnboardingStep2;
