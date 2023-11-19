import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FinancialState, Transaction } from "./model/transactionModel";

const initialState: FinancialState = {
	income: 0,
	totalExpense: 0,
	category: {
		wants: 0,
		needs: 0,
		savings: 0
	},
	transactions: [
		{
			id: Math.random(),
			amount: 200,
			category: "Needs",
			date: `${new Date()}`,
			description: "values.description",
			type: "expense"
		},
		{
			id: Math.random(),
			amount: 600,
			category: "Needs",
			date: `${new Date()}`,
			description: "values.description",
			type: "expense"
		},
		{
			id: Math.random(),
			amount: 60,
			category: "Savings",
			date: `${new Date()}`,
			description: "values.description",
			type: "expense"
		},
		{
			id: Math.random(),
			amount: 900,
			category: "Needs",
			date: `${new Date()}`,
			description: "values.description",
			type: "expense"
		},
		{
			id: Math.random(),
			amount: 400,
			category: "Wants",
			date: `${new Date()}`,
			description: "values.description",
			type: "expense"
		},
		{
			id: Math.random(),
			amount: 60,
			category: "Savings",
			date: `${new Date()}`,
			description: "values.description",
			type: "expense"
		},
		{
			id: Math.random(),
			amount: 690,
			category: "Wants",
			date: `${new Date()}`,
			description: "values.description",
			type: "expense"
		},
		{
			id: Math.random(),
			amount: 780,
			category: "Wants",
			date: `${new Date()}`,
			description: "values.description",
			type: "expense"
		}
	]
};

const transactionSlice = createSlice({
	name: "transactions",
	initialState,
	reducers: {
		// addTransaction: (
		// 	state: FinancialState,
		// 	action: PayloadAction<Transaction>
		// ) => {
		// 	// Creating a new state object with the updated transactions array
		// 	state.transactions = [...state.transactions, action.payload];
		// },
		// removeTransaction: (
		// 	state: FinancialState,
		// 	action: PayloadAction<Transaction>
		// ) => {
		// 	// Using filter to create a new array with the specified transaction removed
		// 	state.transactions = state.transactions.filter(
		// 		(transaction: Transaction) =>
		// 			transaction.id !== action.payload.id ||
		// 			transaction.category !== action.payload.category
		// 	);
		// },
		// updateTransaction: (
		// 	state: FinancialState,
		// 	action: PayloadAction<Transaction>
		// ) => {
		// 	const updatedTransaction = action.payload;
		// 	const transactionIndex = state.transactions.findIndex(
		// 		transaction =>
		// 			transaction.id === updatedTransaction.id &&
		// 			transaction.category === updatedTransaction.category
		// 	);

		// 	if (transactionIndex !== -1) {
		// 		// Creating a new array with the updated transaction
		// 		state.transactions = state.transactions.map(
		// 			(transaction, index) =>
		// 				index === transactionIndex
		// 					? updatedTransaction
		// 					: transaction
		// 		);
		// 	}
		updateCategoryTotal: (state: FinancialState, action: PayloadAction<{ category: string; amount: number }>) => {
			const { category, amount } = action.payload;
			console.log(action.payload, state)
			state.category[category.toLowerCase()] += amount;
		},
		setTotalIncome: (state, action: PayloadAction<number>) => {
			state.income += action.payload;

			state.category.needs = state.income * 0.5;
			state.category.wants = state.income * 0.3;
			state.category.savings = state.income * 0.2;
		},
		// }
	}
});

export const {
	// addTransaction,
	// removeTransaction,
	// updateTransaction
	updateCategoryTotal,
	setTotalIncome
} = transactionSlice.actions;
export default transactionSlice.reducer;
