"use client";

import { combineReducers } from '@reduxjs/toolkit';
import blogSlice from '@/features/blogs/blogSlice';
import flashMessageSlice from '@/features/flashMessages/flashMessageSlice';
import authSlice from '@/features/auth/authSlice';
import generalSlice from './general/generalSlice';
import categorySlice from './category/categorySlice';
import authorSlice from './author/authorSlice';
import getBlogBySlugSlice from './blogs/getBlogBySlugSlice';

const rootReducer = combineReducers({
    blogs: blogSlice,
    flashMessage: flashMessageSlice,
    auth: authSlice,
    general: generalSlice,
    categories: categorySlice,
    author: authorSlice,
    blogBySlug: getBlogBySlugSlice
})

export default rootReducer;