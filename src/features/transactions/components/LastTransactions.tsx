import React, { useEffect, useState } from 'react';

import Button from 'src/components/button/Button';
import Card from 'src/components/card/Card';
import Modal from 'src/components/dialog/Modal';
import Select from 'src/components/select/Select';
import Separator from 'src/components/separator/Separator';

import { useAppDispatch, useAppSelector } from 'src/store/hooks';

import { useGetTransactionQuery } from '../api/transactionsApi';
import { transactionOptions } from '../model/transactionOptions';
import { filterLastWeekTransactions, filterThisMonthTransactions, filterThisWeekTransactions } from '../transactionSlice';
import AddExpense from './AddExpense';
import ExpenseCard from './ExpenseCard';

const LastTransactions = () => {
    const dispatch = useAppDispatch();
    const { userInfo } = useAppSelector((state) => state.authStore);

    const { data, isLoading } = useGetTransactionQuery(userInfo?.id);
    const { transactions } = useAppSelector((state) => state.transactionStore);

    const [period, setPeriod] = useState<string>('');
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handlePeriod = (value: string) => {
        setPeriod(value);

        if (data) {
            switch (value) {
                case 'This Week':
                    dispatch(filterThisWeekTransactions(data.transactions));
                    break;
                case 'Last Week':
                    dispatch(filterLastWeekTransactions(data.transactions));
                    break;
                case 'This Month':
                    dispatch(filterThisMonthTransactions(data.transactions));
                    break;
                default:
                    break;
            }
        }
    };

    if (transactions.length === 0) return null;

    return (
        <>
            <Card className="flex h-full flex-col">
                <div className="flex items-center justify-between">
                    <p className="text-base font-semibold leading-4">Last Transactions</p>

                    <Select onChange={handlePeriod} options={transactionOptions} value={period} placeholder="Select Period" />
                </div>

                <Separator />

                <div className="h-full overflow-auto pr-4">
                    {transactions.map((transaction, i) => {
                        return (
                            <div key={Math.random()}>
                                <ExpenseCard {...transaction} />
                                {transactions.length !== i + 1 && <Separator />}
                            </div>
                        );
                    })}
                </div>

                <Separator />

                <div className="flex justify-end">
                    <Modal
                        title="Add your recurring expenses"
                        triggerAsChild
                        open={isOpen}
                        onOpenChange={() => setIsOpen(true)}
                        trigger={
                            <Button size="lg" variant="outline">
                                Add new transaction
                            </Button>
                        }
                    >
                        <AddExpense additionalFn={() => setIsOpen(false)} />
                    </Modal>
                </div>
            </Card>
        </>
    );
};

export default LastTransactions;
