// controllers/cartController.js
const Cart = require('../models/Cart');

// Get user's cart
exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({
            user: req.user.id,
        }).populate('items.productId');
        if (!cart)
            return res.status(404).json({
                message: 'Cart not found',
            });
        res.json(cart);
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
        });
    }
};

// Add item to cart
exports.addItemToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        let cart = await Cart.findOne({
            user: req.user.id,
        });

        if (cart) {
            const itemIndex = cart.items.findIndex(
                item => item.productId.toString() === productId
            );
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            } else {
                cart.items.push({
                    productId,
                    quantity,
                });
            }
        } else {
            cart = new Cart({
                user: req.user.id,
                items: [
                    {
                        productId,
                        quantity,
                    },
                ],
            });
        }

        await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
        });
    }
};

// Remove item from cart
exports.removeItemFromCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({
            user: req.user.id,
        });
        if (!cart)
            return res.status(404).json({
                message: 'Cart not found',
            });

        cart.items = cart.items.filter(
            item => item.productId.toString() !== req.params.productId
        );
        await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
        });
    }
};
