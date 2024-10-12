// controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Register a new user
exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({
            email,
        });
        if (user)
            return res.status(400).json({
                message: 'User already exists',
            });

        user = new User({
            name,
            email,
            password,
        });
        await user.save();

        const payload = {
            user: {
                id: user.id,
            },
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        res.json({
            token,
            user,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
        });
    }
};

// User login
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({
            email,
        });
        if (!user)
            return res.status(400).json({
                message: 'Invalid credentials',
            });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({
                message: 'Invalid credentials',
            });

        const payload = {
            user: {
                id: user.id,
            },
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        res.json({
            token,
            user,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
        });
    }
};

// Get user profile
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
        });
    }
};
