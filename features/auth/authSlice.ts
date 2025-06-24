"use client";

import { createSlice, createAsyncThunk, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import { setFlashMessage } from '@/features/flashMessages/flashMessageSlice';
import authService from '@/services/auth-service';
import { LoginFailureResponse, LoginSuccessResponse, User } from '@/services/types/type';
import { RootState } from '../Store';

interface InitialState {
  isAuthenticated: boolean,
  token: string | null,
  role: string | null,
  loading: boolean,
  error: string | null,
}

const initialState: InitialState = {
  isAuthenticated: false,
  token: null,
  role: null,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk<LoginSuccessResponse, User, { rejectValue: LoginFailureResponse; state: RootState }>(
  'auth/loginUser',
  async (user, thunkAPI) => {
    try {
      const response = await authService.login(user);
      console.log("Login response:", response);
      if (response.status && 'data' in response) {
        return {
          status: true,
          message: "Login successful",
          data: {
            IsLoggedIn: response.data.IsLoggedIn,
            Token: response.data.Token
          }
        } as LoginSuccessResponse;
      } else {
        return thunkAPI.rejectWithValue({
          status: false,
          message: "Login unsuccessful or data missing"
        });
      }
    } catch (error) {
      let errorMessage = "Network error";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'object' && error !== null && 'response' in error) {
        const responseError = error as { response?: { data?: { message?: string } } };
        errorMessage = responseError.response?.data?.message || "Network error";
      }
      return thunkAPI.rejectWithValue({
        status: false,
        message: errorMessage
      });
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => initialState
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = action.payload.data.IsLoggedIn;
        state.token = action.payload.data.Token;
        state.loading = false;

        setFlashMessage({
          message: 'Login successful!',
          type: 'success'
        });
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<LoginFailureResponse | undefined, string, never, SerializedError>) => {
        state.isAuthenticated = false;
        state.loading = false;
        state.error = action.payload?.message || 'An unknown error occurred';

        setFlashMessage({
          message: 'Login failed',
          type: 'error'
        });
      });
  }
});

export default authSlice.reducer;
export const { logout } = authSlice.actions;