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
		setLoginInfo: (state, { payload }) => {
			const { email, password } = payload;

			state.email = email;
			state.password = password;
		},
		setAccountInfo: (state, { payload }) => {
			const { fullName, username, jobRole } = payload;

			state.fullName = fullName;
			state.username = username;
			state.jobRole = jobRole;
		},
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

export const { nextStep, prevStep, setAccountInfo, setLoginInfo } = loginSlice.actions;
export default loginSlice.reducer;
