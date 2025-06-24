"use client";

import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './RootState';

const store = configureStore({
    reducer: rootReducer
});

const getToken = () => store?.getState()?.general?.token;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, getToken }