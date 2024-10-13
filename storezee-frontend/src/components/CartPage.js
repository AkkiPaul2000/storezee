// src/components/CartPage.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, removeItemFromCart } from '../slices/cartSlice';

const CartPage = () => {
    const dispatch = useDispatch();
    const { items, loading, error } = useSelector(state => state.cart);
    const { token } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(fetchCart(token));
    }, [dispatch, token]);

    const handleRemoveItem = productId => {
        dispatch(removeItemFromCart(productId));
    };

    if (loading) return <p> Loading cart... </p>;
    if (error) return <p> Error loading cart: {error} </p>;

    return (
        <div>
            <h1> Your Cart </h1>{' '}
            <ul>
                {' '}
                {items.map(item => (
                    <li key={item.productId._id}>
                        {' '}
                        {item.productId.name} - Quantity: {item.quantity}{' '}
                        <button
                            onClick={() => handleRemoveItem(item.productId._id)}
                        >
                            {' '}
                            Remove{' '}
                        </button>{' '}
                    </li>
                ))}{' '}
            </ul>{' '}
        </div>
    );
};

export default CartPage;
