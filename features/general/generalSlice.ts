"use client";

import storageService from '@/services/storage-service';
import { UserData } from '@/services/types/type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setFlashMessage } from '../flashMessages/flashMessageSlice';
import { AppDispatch } from '../Store';

export interface GeneralInitialState {
    isAppLoading: boolean;
    token: string;
    userData: UserData | null;
}

const initialState: GeneralInitialState = {
    isAppLoading: true,
    token: storageService.getToken(),
    userData: storageService.getUserData(),
};

export const generalSlice = createSlice({
    name: 'general',
    initialState,
    reducers: {
        logoutGeneral: () => initialState,
        setIsAppLoading: (state, action: PayloadAction<boolean>) => {
            state.isAppLoading = action.payload;
        },
        setToken: (state, action: PayloadAction<string>) => {
            storageService.setToken(action.payload);
            state.token = action.payload;
        },
        setUserData: (state, action: PayloadAction<UserData | null>) => {
            if (action.payload) {
                storageService.setUserData(action.payload);
                state.userData = action.payload;
            } else {
                storageService.removeData('userData');
            }
        },
    },
});

export const appStart = () => async (dispatch: AppDispatch) => {
    try {
        const token = storageService.getToken();
        if (token) {
            dispatch(setToken(token));

            const userData = storageService.getUserData();
            dispatch(setUserData(userData));
        }
    } catch (error) {
        console.error("Error during app start:", error);
        dispatch(setFlashMessage({ message: "An error occurred during app initialization.", type: "error" }));
    } finally {
        dispatch(setIsAppLoading(false));
    }
};

export default generalSlice.reducer;

export const { setToken, setUserData, setIsAppLoading, logoutGeneral } = generalSlice.actions;