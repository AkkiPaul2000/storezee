// controllers/transactionController.js
const Transaction = require('../models/Transaction');
const Cart = require('../models/Cart');

// Create a transaction from the user's cart
exports.createTransaction = async (req, res) => {
    try {
        const cart = await Cart.findOne({
            user: req.user.id,
        }).populate('items.productId');
        if (!cart)
            return res.status(400).json({
                message: 'No items in cart',
            });

        const totalAmount = cart.items.reduce(
            (total, item) => total + item.productId.price * item.quantity,
            0
        );

        const transaction = new Transaction({
            user: req.user.id,
            items: cart.items.map(item => ({
                productId: item.productId._id,
                quantity: item.quantity,
                price: item.productId.price,
            })),
            totalAmount,
        });

        await transaction.save();
        // Clear the user's cart after the transaction
        cart.items = [];
        await cart.save();

        res.json({
            message: 'Transaction successful',
            transaction,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
        });
    }
};
