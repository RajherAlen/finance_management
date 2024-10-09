import React, { useEffect, useMemo, useState } from 'react';
import { AxisOptions, Chart } from 'react-charts';

import Card from 'src/components/card/Card';

import { useGetTransactionQuery } from 'src/features/transactions/api/transactionsApi';

import filterLastTransactions from 'src/lib/utils/filterLastTransactions';
import { useAppSelector } from 'src/store/hooks';

import { barColors } from '../lib/utils/barColors';
import { getSeriesData } from '../lib/utils/getSeriesData';

const AnalyticsBudgetSplitChart = ({ filterMonths = 3 }: { filterMonths?: number }) => {
    const [filteredTransactions, setFilteredTransactions] = useState<
        Record<string, { wants: number; needs: number; savings: number; loan: number }>
    >({});

    const { userInfo } = useAppSelector((state) => state.authStore);
    const { data: transactionsData, isLoading } = useGetTransactionQuery(userInfo?.id);

    useEffect(() => {
        if (!isLoading && transactionsData) {
            setFilteredTransactions(filterLastTransactions(transactionsData.transactions, filterMonths));
        }
    }, [isLoading, transactionsData]);

    const seriesData = getSeriesData(filteredTransactions);

    const data = useMemo(() => {
        return [
            { label: 'Needs', data: seriesData.map((item) => ({ date: item.month, value: item.needs })) },
            { label: 'Wants', data: seriesData.map((item) => ({ date: item.month, value: item.wants })) },
            { label: 'Savings', data: seriesData.map((item) => ({ date: item.month, value: item.savings })) },
            { label: 'Loans', data: seriesData.map((item) => ({ date: item.month, value: item.loan })) },
        ];
    }, [seriesData]);

    const primaryAxis = useMemo<AxisOptions<{ date: string }>>(
        () => ({
            getValue: (data) => data.date,
            scaleType: 'band',
        }),
        []
    );

    const secondaryAxes = useMemo<AxisOptions<{ value: number }>[]>(() => [{ getValue: (data) => data.value, scaleType: 'linear' }], []);

    const getSeriesStyle = React.useCallback((series: any) => ({ color: barColors[series.label] }), [barColors]);

    return (
        <div className='w-full'>
            <p className='mb-2 text-sm font-semibold text-gray-700'>Last {filterMonths + 1} Months Budget Split Summary</p>
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
