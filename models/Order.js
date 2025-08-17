const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    itemId: String,
    quantity: Number,
    customerPhone: String,
    status: { type: String, default: 'Pending' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);