import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { endOfWeek, isWithinInterval, parseISO, startOfDay, startOfWeek, subMonths, subWeeks } from 'date-fns';
import { formatDate } from 'src/lib/utils/formatDate';
import LocalStorageProvider from 'src/lib/utils/storage/LocalStorageProvider';

import { FinancialState, Saving, Transaction } from './model/transactionModel';
import { UserInfo } from 'src/store/authSlice';

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
    state.totalSavings = state.savings.reduce((acc, s) => acc + s.currentlySaved, 0);
};

const updateTotalGoalSaving = (state: FinancialState) => {
    state.totalGoalSaving = state.savings.reduce((acc, s) => acc + s.goalAmount, 0);
};

const transactionSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        getAllTransactions: (state: FinancialState, action: PayloadAction<Transaction[]>) => {
            if (action.payload) {
                state.transactions = action.payload;
            }
            state.totalExpense = state.transactions.reduce((acc, t) => acc + t.amount, 0);
        },
        addToSavings: (state: FinancialState, action: PayloadAction<Saving>) => {
            state.savings = [...state.savings, action.payload];
            updateTotalSaving(state);
            updateTotalGoalSaving(state);
        },
        updateSaving: (state: FinancialState, action: PayloadAction<Saving[] | undefined>) => {
            if (action.payload) {
                state.savings = action.payload;
            }
            updateTotalSaving(state);
            updateTotalGoalSaving(state);
        },
        filterThisWeekTransactions: (state: FinancialState, action: PayloadAction<Transaction[]>) => {
            const now = new Date();
            const startOfCurrentWeek = startOfWeek(now, { weekStartsOn: 1 });
            const endOfCurrentWeek = endOfWeek(now, { weekStartsOn: 1 });

            state.transactions = action.payload.filter((transaction: Transaction) => {
                const transactionDate = parseISO(String(transaction.date));
                return isWithinInterval(transactionDate, { start: startOfCurrentWeek, end: endOfCurrentWeek });
            });
        },
        filterLastWeekTransactions: (state: FinancialState, action: PayloadAction<Transaction[]>) => {
            const now = new Date();
            const startOfCurrentWeek = startOfWeek(now, { weekStartsOn: 1 });
            const startOfLastWeek = subWeeks(startOfCurrentWeek, 1);
            const endOfLastWeek = endOfWeek(startOfLastWeek, { weekStartsOn: 1 });

            state.transactions = action.payload.filter((transaction: Transaction) => {
                const transactionDate = parseISO(String(transaction.date));
                return isWithinInterval(transactionDate, { start: startOfLastWeek, end: endOfLastWeek });
            });
        },
        filterThisMonthTransactions: (state: FinancialState, action: PayloadAction<Transaction[]>) => {
            const currentMonth = formatDate({ date: new Date(), format: 'M' });

            state.transactions = action.payload.filter(
                (transaction: Transaction) => currentMonth === formatDate({ date: transaction.date, format: 'M' })
            );
        },
        filterLastMonthTransactions: (state: FinancialState, action: PayloadAction<Transaction[]>) => {
            const currentMonth = formatDate({ date: new Date(), format: 'M' });
            const lastMonth = +currentMonth - 1;

            state.transactions = action.payload.filter(
                (transaction: Transaction) => lastMonth.toString() === formatDate({ date: transaction.date, format: 'M' })
            );
        },
        filterLastThreeMonthsTransactions: (state: FinancialState, action: PayloadAction<Transaction[]>) => {
            const now = new Date();
            const threeMonthsAgo = subMonths(startOfDay(now), 3);

            state.transactions = action.payload.filter((transaction: Transaction) => {
                const transactionDate = new Date(String(transaction.date));
                return transactionDate >= threeMonthsAgo && transactionDate <= now;
            });
        },
        filterLastSixMonthsTransactions: (state: FinancialState, action: PayloadAction<Transaction[]>) => {
            const now = new Date();
            const sixMonthsAgo = subMonths(startOfDay(now), 6);

            state.transactions = action.payload.filter((transaction: Transaction) => {
                const transactionDate = new Date(String(transaction.date));
                return transactionDate >= sixMonthsAgo && transactionDate <= now;
            });
        },
        setTotalIncome: (state, action: PayloadAction<number>) => {
            const userInfo = LocalStorageProvider.get<UserInfo>('userInfo').value;

            state.income = action.payload;
            if (userInfo) {
                LocalStorageProvider.set('userInfo', { ...userInfo, income: action.payload });
            }

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
    filterLastMonthTransactions,
    filterLastThreeMonthsTransactions,
    filterLastSixMonthsTransactions,
} = transactionSlice.actions;

export default transactionSlice.reducer;
