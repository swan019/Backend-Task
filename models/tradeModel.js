const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
  symbol: String,
  price: Number,
  type: String,  // 'buy' or 'sell'
  quantity: Number,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Trade', tradeSchema);
