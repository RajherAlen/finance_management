export interface Transaction {
    id: number | string;
    amount: number;
    description: string;
    category: 'savings' | 'wants' | 'needs' | 'loan';
    date: Date;
    type: 'income' | 'expense';
    recurring?: boolean;
}

interface CategoryTotals {
    [key: string]: number; // Index signature
}

export interface FinancialState {
    income: number;
    totalExpense: number;
    totalSavings: number;
    totalGoalSaving: number;
    spendByCategory: CategoryTotals;
    budgetCategory: CategoryTotals;
    transactions: Transaction[];
    savings: Saving[];
}

export interface Saving {
    id: number | string;
    name: string;
    goalAmount: number;
    currentlySaved: number;
    date: Date;
}

export type CategoryType = 'wants' | 'needs' | 'savings';
