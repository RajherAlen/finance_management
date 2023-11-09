import { createSlice } from "@reduxjs/toolkit";
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
		addTransaction: (state: FinancialState, action: any) => {
			const newTransaction = action.payload;
			state.transactions.push(newTransaction);
		},
		removeTransaction: (state: FinancialState, action: any) => {
			const { id, type } = action.payload;
			state.transactions.filter(
				(transaction: Transaction) =>
					transaction.id !== id || transaction.type !== type
			);
		},
		updateTransaction: (state: FinancialState, action: any) => {
			const updatedTransaction = action.payload;
			const transactionIndex = state.transactions.findIndex(
				transaction =>
					transaction.id === updatedTransaction.id &&
					transaction.type === updatedTransaction.type
			);

			if (transactionIndex !== -1) {
				state.transactions[transactionIndex] = updatedTransaction;
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
