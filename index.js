const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());

// Connect to MongoDB (will configure in Step 3)
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const Order = require('./models/Order');
app.post('/api/orders', async (req, res) => {
    const { itemId, quantity, customerPhone } = req.body;
    try {
        const order = new Order({ itemId, quantity, customerPhone });
        await order.save();
        res.json({ message: 'Order saved', order });
    } catch (err) {
        res.status(500).json({ error: 'Failed to save order' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));