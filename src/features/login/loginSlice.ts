import { createSlice } from '@reduxjs/toolkit';

type UserState = {
    email: string;
    password: string;
    fullName: string;
    username: string;
    jobRole: string;
    profilePicture: string;
    currentStep: number;
};

const initialState: UserState = {
    email: '',
    password: '',
    fullName: '',
    username: '',
    jobRole: '',
    profilePicture: '',
    currentStep: 0,
};

const loginSlice = createSlice({
    name: 'login',
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
        nextStep: (state) => {
            if (state.currentStep < 4) {
                state.currentStep += 1;
            }
        },
        prevStep: (state) => {
            if (state.currentStep > 1) {
                state.currentStep -= 1;
            }
        },
        resetCurrentStep: (state) => {
            state.currentStep = 0;
        },
    },
});

export const { nextStep, prevStep, setAccountInfo, setLoginInfo, resetCurrentStep } = loginSlice.actions;
export default loginSlice.reducer;
