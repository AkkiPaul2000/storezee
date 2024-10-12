// routes/cartRoutes.js
const express = require('express');
const {
    getCart,
    addItemToCart,
    removeItemFromCart,
} = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, getCart);
router.post('/add', authMiddleware, addItemToCart);
router.delete('/remove/:productId', authMiddleware, removeItemFromCart);

module.exports = router;
