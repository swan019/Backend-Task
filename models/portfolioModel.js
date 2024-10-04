const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  balance: { type: Number, default: 10000 },  // Starting balance
  stocks: [
    {
      symbol: String,
      quantity: Number,
      averagePrice: Number
    }
  ]
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
