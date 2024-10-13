// server.js
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

// Import routes
const authRoutes = require('./routes/authRoutes');
const cartRoutes = require('./routes/cartRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
const cors = require('cors');
app.use(cors());
connectDB();

// Middleware
app.use(express.json()); // For parsing JSON

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/transaction', transactionRoutes);
app.use('/api/products', productRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
