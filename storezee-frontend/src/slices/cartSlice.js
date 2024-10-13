// src/slices/cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch the user's cart from the backend
export const fetchCart = createAsyncThunk('cart/fetchCart', async token => {
    const response = await axios.get('/api/cart', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
});

// Add item to cart
export const addItemToCart = createAsyncThunk(
    'cart/addItemToCart',
    async ({ productId, quantity }, { getState }) => {
        const token = getState().auth.token;
        const response = await axios.post(
            '/api/cart/add',
            {
                productId,
                quantity,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    }
);

// Remove item from cart
export const removeItemFromCart = createAsyncThunk(
    'cart/removeItemFromCart',
    async (productId, { getState }) => {
        const token = getState().auth.token;
        const response = await axios.delete(`/api/cart/remove/${productId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchCart.pending, state => {
                state.loading = true;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.items;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addItemToCart.fulfilled, (state, action) => {
                state.items = action.payload.items;
            })
            .addCase(removeItemFromCart.fulfilled, (state, action) => {
                state.items = action.payload.items;
            });
    },
});

export default cartSlice.reducer;
