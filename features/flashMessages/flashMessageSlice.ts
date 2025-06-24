"use client";

import { createSlice } from '@reduxjs/toolkit';

export interface FlashState {
    message: string | null;
    type: string | null;
    timestamp: string | null;
}

const initialState: FlashState = {
    message: null,
    type: null,
    timestamp: null
};

export const flashMessageSlice = createSlice({
    name: 'flashMessage',
    initialState,
    reducers: {
        setFlashMessage: (state, action) => {
            state.message = action.payload.message;
            state.type = action.payload.type;
            state.timestamp = new Date().getTime().toString();
        },
        clearFlashMessage: state => {
            state.message = null;
            state.type = null;
            state.timestamp = null;
        }
    }
});

export const { setFlashMessage, clearFlashMessage } = flashMessageSlice.actions;

export default flashMessageSlice.reducer;