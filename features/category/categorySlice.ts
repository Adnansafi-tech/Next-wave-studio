"use client";

import handleGetCategories from '@/services/category-service';
import { CategoriesDto } from '@/services/types/type';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface InitialState extends CategoriesDto {
    loading: boolean;
    error: string
}

const initialState: InitialState = {
    Categories: [],
    loading: false,
    error: ''
};

export const fetchCategoriesData = createAsyncThunk(
    'categories/fetchCategoriesData',
    async (_, { rejectWithValue }) => {
        try {
            const response = await handleGetCategories();
            return response.data.categories;
        } catch (error) {
            console.error('Error fetching blogs:', error);
            return rejectWithValue('Failed to fetch blogs');
        }
    }
);

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategories: (state, action) => {
            state = action.payload;
            state.error = '';
            state.loading = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategoriesData.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCategoriesData.fulfilled, (state, action) => {
                const categoriesData = action.payload;
                state.Categories = categoriesData;
                state.loading = false;
            })
            .addCase(fetchCategoriesData.rejected, (state, action) => {
                console.error('Failed to fetch categories:', action.payload);
                state.loading = false;
                state.error = 'Failed to fetch categories'
            });
    }
});

export const {
    setCategories
} = categoriesSlice.actions;

export default categoriesSlice.reducer;