import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Saving, SavingState } from "./model/SavingState";

const initialState: SavingState = {
	total: 0,
	savings: []
};

const savingSlice = createSlice({
	name: "savings",
	initialState,
	reducers: {
		addToSavings: (state: SavingState, action: PayloadAction<Saving>) => {
			state.savings = [...state.savings, action.payload];
		}
	}
});

export const { addToSavings } = savingSlice.actions;
export default savingSlice.reducer;
