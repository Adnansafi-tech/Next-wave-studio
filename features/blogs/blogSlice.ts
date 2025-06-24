"use client";

import blogService from '@/services/blog-service';
import { BlogDto } from '@/services/types/type';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

export interface BlogsDtoInitialState {
    Blogs: BlogDto[],
    loading: boolean;
    error: string
}

const initialState: BlogsDtoInitialState = {
    Blogs: [],
    loading: false,
    error: ''
};

export const fetchBlogsData = createAsyncThunk(
    'blogs/fetchBlogsData',
    async (_, { rejectWithValue }) => {
        try {
            const response = await blogService.getBlogs();
            return response.data.Result;
        } catch (error) {
            console.error('Error fetching blogs:', error);
            return rejectWithValue('Failed to fetch blogs');
        }
    }
);

const blogSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBlogsData.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBlogsData.fulfilled, (state, action: PayloadAction<BlogDto[]>) => {
                state.Blogs = action.payload;
                state.loading = false;
            })
            .addCase(fetchBlogsData.rejected, (state, action) => {
                console.error('Failed to fetch blogs:', action.payload);
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export default blogSlice.reducer;