export interface Transaction {
	id: number;
	amount: number;
	description: string;
	category?: string;
	date: string;
	type: "income" | "expense";
}

export interface FinancialState {
	income: number;
	totalExpense: number;
	savings: number;
	transactions: Transaction[];
}
