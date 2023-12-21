import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FinancialState, Transaction } from "./model/transactionModel";

const initialState: FinancialState = {
	income: 0,
	totalExpense: 0,
	totalSavings: 0,
	spendByCategory: {
		wants: 0,
		needs: 0,
		savings: 0
	},
	budgetCategory: {
		wants: 0,
		needs: 0,
		savings: 0
	},
	transactions: []
};

const transactionSlice = createSlice({
	name: "transactions",
	initialState,
	reducers: {
		addTransaction: (state: FinancialState, action: PayloadAction<Transaction>) => {
			const { category, amount } = action.payload;
			
			state.transactions = [...state.transactions, action.payload];

			if(category.toLowerCase() === "savings") {
				state.totalSavings += amount
			} else if(category.toLowerCase() === "expense") {
				state.totalExpense += amount
			}
			
			state.spendByCategory[category.toLowerCase()] += amount;
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
		deleteTransaction: (state, action: PayloadAction<number>) => {
			state.transactions = state.transactions.filter(transaction => transaction.id !== action.payload)
		}
	}
});

export const {
	addTransaction,
	setTotalIncome,
	updateTotalExpense,
	deleteTransaction
} = transactionSlice.actions;
export default transactionSlice.reducer;
