'use client';

import React, { useEffect, useState } from 'react';

import { AnalyticsListDisplay } from 'src/features/analytics';
import { useGetSavingsQuery } from 'src/features/savings/api/savingsApi';
import { useGetThisMonthTransactionsQuery } from 'src/features/transactions/api/transactionsApi';
import { getAllTransactions, setTotalIncome, updateSaving } from 'src/features/transactions/transactionSlice';

import { useAppDispatch, useAppSelector } from 'src/store/hooks';

const Analytics = () => {
    const dispatch = useAppDispatch();

    const { userInfo } = useAppSelector((state) => state.authStore);
    const { data } = useGetThisMonthTransactionsQuery(userInfo?.id);
    const { data: savingData } = useGetSavingsQuery(userInfo?.id);

    useEffect(() => {
        dispatch(updateSaving(savingData?.savings));

        dispatch(setTotalIncome(userInfo?.income));

        dispatch(getAllTransactions(data?.transactions));
    }, [userInfo, data, dispatch, savingData]);

    return <AnalyticsListDisplay />;
};

export default Analytics;
