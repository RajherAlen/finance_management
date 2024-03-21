import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { formatDate } from 'src/lib/utils/formatDate';
import LocalStorageProvider from 'src/lib/utils/storage/LocalStorageProvider';

import { FinancialState, Saving, Transaction } from './model/transactionModel';

const initialState: FinancialState = {
    income: 0,
    totalExpense: 0,
    totalSavings: 0,
    totalGoalSaving: 0,
    spendByCategory: {
        wants: 0,
        needs: 0,
        savings: 0,
    },
    budgetCategory: {
        wants: 0,
        needs: 0,
        savings: 0,
    },
    transactions: [],
    savings: [],
};

const updateTotalSaving = (state: FinancialState) => {
    state.totalSavings = state.savings.reduce((accumulator, currentValue) => accumulator + currentValue.currentlySaved, 0);
};

const updatetotalGoalSaving = (state: FinancialState) => {
    state.totalGoalSaving = state.savings.reduce((accumulator, currentValue) => accumulator + currentValue.goalAmount, 0);
};

const transactionSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        getAllTransactions: (state: FinancialState, action: PayloadAction<Transaction[]>) => {
            if (action.payload) {
                state.transactions = action.payload;
            }
            state.totalExpense = state.transactions.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0);
        },
        addToSavings: (state: FinancialState, action: PayloadAction<Saving>) => {
            state.savings = [...state.savings, action.payload];
            updateTotalSaving(state);
            updatetotalGoalSaving(state);
        },
        updateSaving: (state: FinancialState, action: PayloadAction<any>) => {
            if (action.payload) {
                state.savings = action.payload;
            }
            updateTotalSaving(state);
            updatetotalGoalSaving(state);
        },
        filterThisWeekTransactions: (state: FinancialState, action) => {
            const currentWeek = formatDate({ date: new Date(), format: 'w' });

            state.transactions = action.payload.filter((transaction: any) => currentWeek === formatDate({ date: transaction.date, format: 'w' }));
        },
        filterLastWeekTransactions: (state: FinancialState, action) => {
            console.log(state)
            const currentWeek = formatDate({ date: new Date(), format: 'w' });
            const lastWeek = +currentWeek - 1;

            state.transactions = action.payload.filter((transaction: any) => lastWeek.toString() === formatDate({ date: transaction.date, format: 'w' }));
        },
        filterThisMonthTransactions: (state: FinancialState, action) => {
            const currentMonth = formatDate({ date: new Date(), format: 'M' });

            state.transactions = action.payload.filter((transaction: any) => currentMonth === formatDate({ date: transaction.date, format: 'M' }));
        },
        setTotalIncome: (state, action: PayloadAction<number>) => {
            const userInfo: any = LocalStorageProvider.get('userInfo').value;

            state.income = action.payload;
            LocalStorageProvider.set('userInfo', { ...userInfo, income: action.payload });

            state.budgetCategory.needs = state.income * 0.5;
            state.budgetCategory.wants = state.income * 0.3;
            state.budgetCategory.savings = state.income * 0.2;
        },
    },
});

export const {
    addToSavings,
    updateSaving,
    getAllTransactions,
    setTotalIncome,
    filterThisWeekTransactions,
    filterLastWeekTransactions,
    filterThisMonthTransactions,
} = transactionSlice.actions;
export default transactionSlice.reducer;
