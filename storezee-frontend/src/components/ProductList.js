// src/components/ProductList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../slices/productSlice';
import { addItemToCart } from '../slices/cartSlice';

const ProductList = () => {
    const dispatch = useDispatch();
    const { items, loading, error } = useSelector(state => state.products);
    const { token } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleAddToCart = productId => {
        dispatch(
            addItemToCart({
                productId,
                quantity: 1,
            })
        );
    };

    if (loading) return <p> Loading products... </p>;
    if (error) return <p> Error loading products: {error} </p>;

    return (
        <div>
            <h1> Products </h1>{' '}
            <ul>
                {' '}
                {items.map(product => (
                    <li key={product._id}>
                        {' '}
                        {product.name} - $ {product.price}{' '}
                        <button onClick={() => handleAddToCart(product._id)}>
                            {' '}
                            Add to Cart{' '}
                        </button>{' '}
                    </li>
                ))}{' '}
            </ul>{' '}
        </div>
    );
};

export default ProductList;
