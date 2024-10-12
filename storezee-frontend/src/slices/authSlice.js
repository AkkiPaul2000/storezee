// src/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async action to fetch user profile based on token
export const fetchUserProfile = createAsyncThunk(
    'auth/fetchUserProfile',
    async (token, { rejectWithValue }) => {
        try {
            const response = await axios.get('/api/profile', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data; // Assuming the API response contains user data
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: null,
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.isAuthenticated = true;
        },
        logout: state => {
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchUserProfile.pending, state => {
                state.loading = true;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
