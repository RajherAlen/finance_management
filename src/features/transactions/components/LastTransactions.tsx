import React, { useEffect, useState } from 'react';

import Button from 'src/components/button/Button';
import Card from 'src/components/card/Card';
import EmptyState from 'src/components/card/EmptyState';
import { Dropdown, DropdownItem } from 'src/components/dropdown';
import GlobalLoader from 'src/components/loader/GlobalLoader';
import Select from 'src/components/select/Select';
import Separator from 'src/components/separator/Separator';

import {
    Banknote,
    BanknoteIcon,
    CreditCardIcon,
    FilterIcon,
    ListChecks,
    PartyPopperIcon,
    PiggyBank,
    PiggyBankIcon,
    RefreshCcwDotIcon,
    ShoppingBasket,
    TimerResetIcon,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

import { useGetTransactionQuery } from '../api/transactionsApi';
import { Transaction } from '../model/transactionModel';
import { transactionOptions } from '../model/transactionOptions';
import {
    filterLastMonthTransactions,
    filterLastSixMonthsTransactions,
    filterLastThreeMonthsTransactions,
    filterLastWeekTransactions,
    filterThisMonthTransactions,
    filterThisWeekTransactions,
} from '../transactionSlice';
import AddExpenseModal from './AddExpenseModal';
import ExpenseCard from './ExpenseCard';
import formatCurrency from 'src/lib/utils/formatCurrency';

const LastTransactions = () => {
    const dispatch = useAppDispatch();
    const [period, setPeriod] = useState<string>('');
    const [transactionData, setTransactionData] = useState<Transaction[]>([]);

    const { userInfo } = useAppSelector((state) => state.authStore);

    const { data, isLoading } = useGetTransactionQuery(userInfo?.id);
    const { transactions } = useAppSelector((state) => state.transactionStore);

    useEffect(() => {
        if (transactions) {
            setTransactionData(transactions);
        }
    }, [transactions]);

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
                case 'Last 3 Months':
                    dispatch(filterLastThreeMonthsTransactions(data.transactions));
                    break;
                case 'Last 6 Months':
                    dispatch(filterLastSixMonthsTransactions(data.transactions));
                    break;
                default:
                    break;
            }
        }
    };

    type FilterTypes = 'all' | 'essentials' | 'non-essentials' | 'savings' | 'loans';

    const handleFilterTransactions = (value: FilterTypes) => {
        switch (value) {
            case 'all': {
                setTransactionData(transactions);
                break;
            }
            case 'essentials':
                setTransactionData(transactions.filter((transaction) => transaction.category === 'needs'));
                break;
            case 'non-essentials':
                setTransactionData(transactions.filter((transaction) => transaction.category === 'wants'));
                break;
            case 'savings':
                setTransactionData(transactions.filter((transaction) => transaction.category === 'savings'));
                break;
            case 'loans':
                setTransactionData(transactions.filter((transaction) => transaction.category === 'loan'));
                break;
            default:
                break;
        }
    };

    if (isLoading) return <GlobalLoader />;

    const iconStyle = {
        size: 16,
        stroke: '#1f1f1f',
        opacity: 0.8,
    };

    return (
        <>
            <Card className="flex h-full flex-col">
                <div className="flex items-center justify-between">
                    <p className="text-base font-semibold leading-4">Last Transactions</p>

                    <div className="flex gap-2">
                        <Dropdown allign="end" variant="outline" size="default" trigger={<FilterIcon {...iconStyle} />}>
                            <DropdownItem onClick={() => handleFilterTransactions('all')}>
                                <ListChecks {...iconStyle} />
                                All Transactions
                            </DropdownItem>

                            <Separator className='my-1' />

                            <DropdownItem onClick={() => handleFilterTransactions('essentials')}>
                                <ShoppingBasket {...iconStyle} />
                                Essentials
                            </DropdownItem>
                            <DropdownItem onClick={() => handleFilterTransactions('non-essentials')}>
                                <PartyPopperIcon {...iconStyle} />
                                Non-Essentials
                            </DropdownItem>
                            <DropdownItem onClick={() => handleFilterTransactions('savings')}>
                                <PiggyBankIcon {...iconStyle} />
                                Savings
                            </DropdownItem>
                            <DropdownItem onClick={() => handleFilterTransactions('loans')}>
                                <CreditCardIcon {...iconStyle} />
                                Loans
                            </DropdownItem>
                        </Dropdown>
                        <Select onChange={handlePeriod} options={transactionOptions} value={period} placeholder="Select Period" />
                    </div>
                </div>

                <Separator />

                <div className="h-full overflow-auto pr-4">
                    {transactionData.length === 0 ? (
                        <EmptyState
                            title="No Transactions Found"
                            description="Looks like there are no transactions recorded for the selected period. Start making transactions to populate your history."
                        />
                    ) : (
                        transactionData.map((transaction, i) => {
                            return (
                                <div key={Math.random()}>
                                    <ExpenseCard {...transaction} />
                                    {transactionData.length !== i + 1 && <Separator />}
                                </div>
                            );
                        })
                    )}
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                    <p className="text-sm text-black/70">
                        Total:
                        <span className="ml-1.5 text-lg font-bold text-black">{formatCurrency(transactionData.reduce((a, b) => a + b.amount, 0))}</span>
                    </p>
                    <AddExpenseModal />
                </div>
            </Card>
        </>
    );
};

export default LastTransactions;
