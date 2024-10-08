import React, { useEffect, useState } from 'react';
import { AxisOptions, Chart } from 'react-charts';

import Card from 'src/components/card/Card';

import { useGetTransactionQuery } from 'src/features/transactions/api/transactionsApi';

import { format, startOfDay, subMonths } from 'date-fns';
import { useAppSelector } from 'src/store/hooks';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const AnalyticsBudgetSplitChart = () => {
    const [filteredTransactions, setFilteredTransactions] = useState<{
        [key: string]: { wants: number; needs: number; savings: number; loan: number };
    }>({});

    const { userInfo } = useAppSelector((state) => state.authStore);
    const { data: transactionsData, isLoading } = useGetTransactionQuery(userInfo?.id);

    useEffect(() => {
        if (!isLoading && transactionsData) {
            filterLastThreeMonthsTransactions(transactionsData.transactions);
        }
    }, [isLoading, transactionsData]);

    const filterLastThreeMonthsTransactions = (transactions: any[]) => {
        const now = new Date();
        const threeMonthsAgo = subMonths(startOfDay(now), 3);

        console.log(transactions);

        // Filter transactions from the last 3 months
        const filtered = transactions.filter((transaction) => {
            const transactionDate = new Date(transaction.date);
            return transactionDate >= threeMonthsAgo && transactionDate <= now;
        });

        // Group transactions by month
        const groupedByMonth = filtered.reduce((acc, transaction) => {
            const transactionDate = new Date(transaction.date);
            const monthKey = format(transactionDate, 'yyyy-MM'); // e.g., '2024-07'

            if (!acc[monthKey]) {
                acc[monthKey] = { wants: 0, needs: 0, savings: 0, loan: 0 };
            }

            // Add values based on the category
            acc[monthKey][transaction.category] += transaction.amount;
            return acc;
        }, {} as Record<string, { wants: number; needs: number; savings: number; loan: number }>);

        setFilteredTransactions(groupedByMonth);
    };

    // Define default colors for each section
    const colors: Record<string, string> = {
        Needs: '#fdba74',
        Wants: '#F97939',
        Savings: '#10b981',
        Loans: '#06b6d4',
    };

    const data = React.useMemo(
        () =>
            Object.keys(filteredTransactions)
                .map((monthKey) => {
                    const monthIndex = new Date(monthKey + '-01').getMonth();
                    return [
                        {
                            label: 'Needs',
                            data: [
                                {
                                    date: months[monthIndex],
                                    value: filteredTransactions[monthKey].needs,
                                },
                            ],
                        },
                        {
                            label: 'Wants',
                            data: [
                                {
                                    date: months[monthIndex],
                                    value: filteredTransactions[monthKey].wants,
                                },
                            ],
                        },
                        {
                            label: 'Savings',
                            data: [
                                {
                                    date: months[monthIndex],
                                    value: filteredTransactions[monthKey].savings,
                                },
                            ],
                        },
                        {
                            label: 'Loans',
                            data: [
                                {
                                    date: months[monthIndex],
                                    value: filteredTransactions[monthKey].loan,
                                },
                            ],
                        },
                    ];
                })
                .flat(),
        [filteredTransactions]
    );

    const primaryAxis = React.useMemo<AxisOptions<(typeof data)[number]['data'][number]>>(
        () => ({
            getValue: (data) => data.date,
            scaleType: 'band',
        }),
        []
    );

    const secondaryAxes = React.useMemo<AxisOptions<(typeof data)[number]['data'][number]>[]>(
        () => [
            {
                getValue: (data) => data.value,
                scaleType: 'linear',
            },
        ],
        []
    );

    const getSeriesStyle = React.useCallback(
        (series: any) => {
            return {
                color: colors[series.label],
            };
        },
        [colors]
    );

    return (
        <div className='w-full'>
            <p className='mb-2 text-sm font-semibold text-gray-700'>Actual spent by category</p>

            <Card>
                <div className='h-[500px]'>
                    <Chart
                        options={{
                            data,
                            primaryAxis,
                            secondaryAxes,
                            getSeriesStyle,
                            padding: { top: 10, bottom: 10, left: 10, right: 10 },
                        }}
                    />
                </div>
            </Card>
        </div>
    );
};

export default AnalyticsBudgetSplitChart;
