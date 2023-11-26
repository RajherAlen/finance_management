import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	email: "",
	password: "",
	fullName: "",
	username: "",
	jobRole: "",
	profilePicture: "",
	currentStep: 0
};

const loginSlice = createSlice({
	name: "login",
	initialState,
	reducers: {
		nextStep: state => {
			if (state.currentStep < 3) {
				state.currentStep += 1;
			}
		},
		prevStep: state => {
			if (state.currentStep > 1) {
				state.currentStep -= 1;
			}
		}
	}
});

export const { nextStep, prevStep } = loginSlice.actions;
export default loginSlice.reducer;
