const { executeTrade } = require('../services/tradingService');
const { getStockPrice } = require('../services/stockService');

// Initiate a trade (buy/sell)
exports.initiateTrade = async (req, res) => {
  const { symbol, action, quantity } = req.body;
  
  const result = await executeTrade(symbol, action, quantity);
  res.status(200).json(result);
};

// Fetch the latest stock price
exports.getStockPrice = async (req, res) => {
  const symbol = req.params.symbol;
  const price = await getStockPrice(symbol);
  if (price) {
    res.status(200).json({ symbol, price });
  } else {
    res.status(404).json({ message: 'Stock not found' });
  }
};
