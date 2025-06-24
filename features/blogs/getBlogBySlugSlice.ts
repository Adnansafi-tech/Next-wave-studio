"use client";

import blogService from '@/services/blog-service';
import { BlogDto } from '@/services/types/type';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface GetBlogBySlugInitialState {
    blog: BlogDto;
    loading: boolean;
    error: string
}

const initialState: GetBlogBySlugInitialState = {
    blog: {
        CreatedDateTimeUtc: '',
        Slug: '',
        Thumbnail: undefined,
        MainPicture: {
            Path: '',
            Name: '',
            ContainerName: '',
            FolderName: ''
        },
        Body: '',
        FootNotes: [],
        BlogMetadata: {
            Title: '',
            Description: '',
            BlogAuthors: [],
            Category: {
                Name: '',
                Description: '',
            },
            Language: '',
            DescriptionTag: '',
            Keywords: '',
            ReadingTime: '',
            Version: '',
            Status: ''
        },
    },
    loading: false,
    error: ''
};

export const fetchBlogBySlug = createAsyncThunk(
    'blogs/fetchBlogBySlug',
    async (slug: string, { rejectWithValue }) => {
        try {
            const response = await blogService.getBlogBySlug(slug);
            console.log(response)
            return response.data;
        } catch (error) {
            console.error('Error fetching blog:', error);
            return rejectWithValue('Failed to fetch blog');
        }
    }
);

const blogBySlugSlice = createSlice({
    name: 'blogBySlug',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBlogBySlug.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBlogBySlug.fulfilled, (state, action) => {
                const blogData = action.payload;
                state.blog = blogData;
                state.loading = false;
            })
            .addCase(fetchBlogBySlug.rejected, (state, action) => {
                console.error('Failed to fetch blogs:', action.payload);
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export default blogBySlugSlice.reducer;