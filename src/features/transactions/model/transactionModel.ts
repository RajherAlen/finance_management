export interface Transaction {
	id: number;
	amount: number;
	description: string;
	date: string;
	type: string;
}

export interface FinancialState {
	income: number;
	totalExpense: number;
	savings: number;
	transactions: Transaction[];
}
