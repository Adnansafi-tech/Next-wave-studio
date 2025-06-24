"use client";

import handleGetAuthorById from '@/services/author-service';
import { AuthorDto } from '@/services/types/type';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface AuthorInitialState {
    Author: AuthorDto | null;
    loading: boolean;
    error: string;
}

const initialState: AuthorInitialState = {
    Author: null,
    loading: false,
    error: ''
};

export const fetchAuthorData = createAsyncThunk(
    'author/fetchAuthorData',
    async (Id: string, { rejectWithValue }) => {
        try {
            const response = await handleGetAuthorById(Id);
            return response.data;
        } catch (error) {
            console.error('Error fetching blogs:', error);
            return rejectWithValue('Failed to fetch blogs');
        }
    }
);

const authorSlice = createSlice({
    name: 'author',
    initialState,
    reducers: {
        setAuthor: (state, action) => {
            state = action.payload;
            state.error = '';
            state.loading = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAuthorData.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAuthorData.fulfilled, (state, action) => {
                const authorData = action.payload;
                console.log(action.payload)
                state.Author = authorData;
                state.loading = false;
            })
            .addCase(fetchAuthorData.rejected, (state, action) => {
                console.error('Failed to fetch author:', action.payload);
                state.loading = false;
                state.error = 'Failed to fetch author'
            });
    }
});

export const {
    setAuthor
} = authorSlice.actions;

export default authorSlice.reducer;