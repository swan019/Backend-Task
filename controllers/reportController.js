const Trade = require('../models/tradeModel');

// Get profit/loss report based on completed trades
exports.getProfitLossReport = async (req, res) => {
  const trades = await Trade.find({});
  let profit = 0;

  trades.forEach(trade => {
    if (trade.type === 'sell') {
      const buyPrice = trade.price * 0.97; // Example buy price
      profit += (trade.price - buyPrice) * trade.quantity;
    }
  });

  res.status(200).json({ totalProfit: profit });
};
