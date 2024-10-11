// Login Route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({
        email,
    });
    if (!user)
        return res.status(400).json({
            error: 'Invalid credentials',
        });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
        return res.status(400).json({
            error: 'Invalid credentials',
        });

    // Generate JWT
    const token = jwt.sign(
        {
            userId: user._id,
        },
        JWT_SECRET,
        {
            expiresIn: '1h',
        }
    );
    res.json({
        token,
    });
});

// Middleware to protect routes
const auth = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token)
        return res.status(401).json({
            error: 'Access denied',
        });

    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({
            error: 'Invalid token',
        });
    }
};

// Protected Add to Cart Route
app.post('/add-to-cart', auth, (req, res) => {
    res.json({
        message: 'Item added to cart',
    });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
