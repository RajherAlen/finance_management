import React, { useEffect, useState } from 'react';

import Card from 'src/components/card/Card';
import EmptyState from 'src/components/card/EmptyState';
import GlobalLoader from 'src/components/loader/GlobalLoader';
import Select from 'src/components/select/Select';
import Separator from 'src/components/separator/Separator';

import { useAppDispatch, useAppSelector } from 'src/store/hooks';

import { useGetTransactionQuery } from '../api/transactionsApi';
import { transactionOptions } from '../model/transactionOptions';
import {
    filterLastMonthTransactions,
    filterLastWeekTransactions,
    filterThisMonthTransactions,
    filterThisWeekTransactions,
} from '../transactionSlice';
import AddExpenseModal from './AddExpenseModal';
import ExpenseCard from './ExpenseCard';

const LastTransactions = () => {
    const dispatch = useAppDispatch();
    const [period, setPeriod] = useState<string>('');

    const { userInfo } = useAppSelector((state) => state.authStore);

    const { data, isLoading } = useGetTransactionQuery(userInfo?.id);
    const { transactions } = useAppSelector((state) => state.transactionStore);

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
                case 'Last Month':
                    dispatch(filterLastMonthTransactions(data.transactions));
                    break;
                default:
                    break;
            }
        }
    };

    if (isLoading) return <GlobalLoader />;
    if (data.transactions.length === 0) {
        return (
            <EmptyState
                actionComponent={<AddExpenseModal />}
                title="No Transactions Yet"
                description="It looks like you haven't made any transactions yet. Start adding transactions to track your financial activity."
            />
        );
    }

    return (
        <>
            <Card className="flex h-full flex-col">
                <div className="flex items-center justify-between">
                    <p className="text-base font-semibold leading-4">Last Transactions</p>

                    <Select onChange={handlePeriod} options={transactionOptions} value={period} placeholder="Select Period" />
                </div>

                <Separator />

                <div className="h-full overflow-auto pr-4">
                    {transactions.length === 0 ? (
                        <EmptyState
                            title="No Transactions Found"
                            description="Looks like there are no transactions recorded for the selected period. Start making transactions to populate your history."
                        />
                    ) : (
                        transactions.map((transaction, i) => {
                            return (
                                <div key={Math.random()}>
                                    <ExpenseCard {...transaction} />
                                    {transactions.length !== i + 1 && <Separator />}
                                </div>
                            );
                        })
                    )}
                </div>

                <Separator />

                <AddExpenseModal />
            </Card>
        </>
    );
};

export default LastTransactions;
