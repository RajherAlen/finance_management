export interface Transaction {
	id: number;
	amount: number;
	description: string;
	category: string;
	date: Date;
	type: "income" | "expense";
}

interface CategoryTotals {
	[key: string]: number; // Index signature
}

export interface FinancialState {
	income: number;
	totalExpense: number;
	totalSavings: number;
	spendByCategory: CategoryTotals;
	budgetCategory: CategoryTotals;
	transactions: Transaction[];
}

export type CategoryType = "wants" | "needs" | "savings";
