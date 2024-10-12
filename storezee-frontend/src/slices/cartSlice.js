// src/slices/cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch the cart from the API
export const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    async (token, { rejectWithValue }) => {
        try {
            const response = await axios.get('/api/cart', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data; // Assuming API returns cart data
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Add item to cart
export const addItemToCart = createAsyncThunk(
    'cart/addItemToCart',
    async ({ productId, quantity }, { getState, rejectWithValue }) => {
        const token = getState().auth.token;
        try {
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
            return response.data; // Assuming API returns updated cart data
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Remove item from cart
export const removeItemFromCart = createAsyncThunk(
    'cart/removeItemFromCart',
    async (productId, { getState, rejectWithValue }) => {
        const token = getState().auth.token;
        try {
            const response = await axios.delete(
                `/api/cart/remove/${productId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data; // Assuming API returns updated cart data
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
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
                state.items = action.payload.items; // Assuming API returns `items` array
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addItemToCart.fulfilled, (state, action) => {
                state.items = action.payload.items; // Update with the latest cart items
            })
            .addCase(removeItemFromCart.fulfilled, (state, action) => {
                state.items = action.payload.items; // Update with the latest cart items
            });
    },
});

export default cartSlice.reducer;
