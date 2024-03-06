import { createSlice } from '@reduxjs/toolkit';
import LocalStorageProvider from 'src/lib/utils/storage/LocalStorageProvider';

// initialize userToken from local storage
const userToken = LocalStorageProvider.get('userToken').value ? LocalStorageProvider.get('userToken').value : null;

// initialize userInfo from local storage
const userInfo = LocalStorageProvider.get('userInfo').value ? LocalStorageProvider.get('userInfo').value : null;

type UserState = {
    userInfo: any;
    userToken: string | null | unknown;
};

const initialState: UserState = {
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
        setCredentials: (state, { payload }) => {
            state.userInfo = payload.data.userInfo;
            state.userToken = payload.data.userToken;

            LocalStorageProvider.set('userInfo', state.userInfo);
            LocalStorageProvider.set('userToken', state.userToken);
        },
    },
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;
