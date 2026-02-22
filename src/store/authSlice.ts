import { createSlice } from '@reduxjs/toolkit';
import LocalStorageProvider from 'src/lib/utils/storage/LocalStorageProvider';

export interface UserInfo {
    id: number;
    email: string;
    fullName: string;
    jobRole: string;
    username: string;
    income: number;
}

type AuthState = {
    userInfo: UserInfo | null;
    userToken: string | null;
};

// initialize userToken from local storage
const userToken = LocalStorageProvider.get<string>('userToken').value ?? null;

// initialize userInfo from local storage
const userInfo = LocalStorageProvider.get<UserInfo>('userInfo').value ?? null;

const initialState: AuthState = {
    userToken,
    userInfo,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            LocalStorageProvider.remove('userInfo');
            LocalStorageProvider.remove('userToken');

            state.userInfo = null;
            state.userToken = null;
        },
        login: (state, { payload }) => {
            state.userInfo = payload.data.userInfo;
            state.userToken = payload.data.userToken;

            LocalStorageProvider.set('userInfo', state.userInfo);
            LocalStorageProvider.set('userToken', state.userToken);
        },
    },
});

export const { logout, login } = authSlice.actions;
export default authSlice.reducer;
