export interface SavingState {
    total: number
	savings: Saving[]
}

export interface Saving {
    id: number | string;
	name: string,
	goalAmount: number,
	currentlySaved: number
}