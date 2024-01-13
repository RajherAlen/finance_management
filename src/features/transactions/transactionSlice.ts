import { PayloadAction, createSlice } from '@reduxjs/toolkit';

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
        addTransaction: (state: FinancialState, action: PayloadAction<Transaction>) => {
            const { category, amount } = action.payload;
            state.transactions = [...state.transactions, action.payload];
            state.spendByCategory[category.toLowerCase()] += amount;
        },
        addToSavings: (state: FinancialState, action: PayloadAction<Saving>) => {
            state.savings = [...state.savings, action.payload];
            updateTotalSaving(state);
            updatetotalGoalSaving(state);
        },
        updateSaving: (state: FinancialState, action: PayloadAction<Saving>) => {
            state.savings = state.savings.map((saving) => (saving.id === action.payload.id ? action.payload : saving));
            updateTotalSaving(state);
            updatetotalGoalSaving(state);
        },
        deleteSaving: (state, action: PayloadAction<number | string>) => {
            state.savings = state.savings.filter((saving) => saving.id !== action.payload);
            updateTotalSaving(state);
        },
        setTotalIncome: (state, action: PayloadAction<number>) => {
            state.income += action.payload;

            state.budgetCategory.needs = state.income * 0.5;
            state.budgetCategory.wants = state.income * 0.3;
            state.budgetCategory.savings = state.income * 0.2;
        },
        updateTotalExpense: (state, action: PayloadAction<number>) => {
            state.totalExpense += action.payload;
        },
        deleteTransaction: (state, action: PayloadAction<number | string>) => {
            state.transactions = state.transactions.filter((transaction) => {
                if (transaction.id === action.payload) {
                    state.spendByCategory[transaction.category.toLowerCase()] -= transaction.amount;

                    if (transaction.type.toLowerCase() === 'savings') {
                        state.totalSavings -= transaction.amount;
                    } else if (transaction.type.toLowerCase() === 'expense') {
                        state.totalExpense -= transaction.amount;
                    }
                }

                return transaction.id !== action.payload;
            });
        },
    },
});

export const { addTransaction, addToSavings, updateSaving, deleteSaving, setTotalIncome, updateTotalExpense, deleteTransaction } =
    transactionSlice.actions;
export default transactionSlice.reducer;
