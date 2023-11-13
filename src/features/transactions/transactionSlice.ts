import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FinancialState, Transaction } from "./model/transactionModel";

const initialState = {
	income: 1200,
	totalExpense: 0,
	savings: 12300,
	transactions: []
};

const transactionSlice = createSlice({
	name: "transactions",
	initialState,
	reducers: {
		addTransaction: (
			state: FinancialState,
			action: PayloadAction<Transaction>
		) => {
			// Creating a new state object with the updated transactions array
			state.transactions = [...state.transactions, action.payload];
		},
		removeTransaction: (
			state: FinancialState,
			action: PayloadAction<Transaction>
		) => {
			// Using filter to create a new array with the specified transaction removed
			state.transactions = state.transactions.filter(
				(transaction: Transaction) =>
					transaction.id !== action.payload.id ||
					transaction.category !== action.payload.category
			);
		},
		updateTransaction: (
			state: FinancialState,
			action: PayloadAction<Transaction>
		) => {
			const updatedTransaction = action.payload;
			const transactionIndex = state.transactions.findIndex(
				transaction =>
					transaction.id === updatedTransaction.id &&
					transaction.category === updatedTransaction.category
			);

			if (transactionIndex !== -1) {
				// Creating a new array with the updated transaction
				state.transactions = state.transactions.map(
					(transaction, index) =>
						index === transactionIndex
							? updatedTransaction
							: transaction
				);
			}
		}
	}
});

export const {
	addTransaction,
	removeTransaction,
	updateTransaction
} = transactionSlice.actions;
export default transactionSlice.reducer;
