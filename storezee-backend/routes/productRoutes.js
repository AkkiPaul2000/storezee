// productRoutes.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({
            error: 'Failed to fetch products',
        });
    }
});

// Create a new product
router.post('/', async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({
            error: 'Invalid product data',
        });
    }
});

// Get a specific product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                error: 'Product not found',
            });
        }
        res.json(product);
    } catch (err) {
        res.status(500).json({
            error: 'Failed to fetch product',
        });
    }
});

// Update a product by ID
router.put('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
            }
        );
        if (!product) {
            return res.status(404).json({
                error: 'Product not found',
            });
        }
        res.json(product);
    } catch (err) {
        res.status(400).json({
            error: 'Invalid product data',
        });
    }
});

// Delete a product by ID
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({
                error: 'Product not found',
            });
        }
        res.json({
            message: 'Product deleted successfully',
        });
    } catch (err) {
        res.status(500).json({
            error: 'Failed to delete product',
        });
    }
});

module.exports = router;
