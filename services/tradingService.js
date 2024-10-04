const { getStockPrice } = require('./stockService');
const Portfolio = require('../models/portfolioModel');
const Trade = require('../models/tradeModel');

// Execute a trade (buy/sell)
exports.executeTrade = async (symbol, action, quantity) => {
  const price = await getStockPrice(symbol);
  if (!price) return { message: 'Stock price unavailable' };

  const portfolio = await Portfolio.findOne();
  let tradeDetails;

  if (action === 'buy') {
    tradeDetails = await buyStock(portfolio, symbol, quantity, price);
  } else if (action === 'sell') {
    tradeDetails = await sellStock(portfolio, symbol, quantity, price);
  }

  await portfolio.save();
  return tradeDetails;
};

// Buy stock logic
async function buyStock(portfolio, symbol, quantity, price) {
  portfolio.balance -= price * quantity;
  let stock = portfolio.stocks.find(stock => stock.symbol === symbol);

  if (stock) {
    stock.quantity += quantity;
    stock.averagePrice = (stock.averagePrice * stock.quantity + price * quantity) / (stock.quantity + quantity);
  } else {
    portfolio.stocks.push({ symbol, quantity, averagePrice: price });
  }

  await Trade.create({ symbol, price, type: 'buy', quantity });
  return { message: `Bought ${quantity} shares of ${symbol} at $${price}` };
}

// Sell stock logic
async function sellStock(portfolio, symbol, quantity, price) {
  let stock = portfolio.stocks.find(stock => stock.symbol === symbol);
  if (!stock || stock.quantity < quantity) return { message: 'Insufficient stock to sell' };

  portfolio.balance += price * quantity;
  stock.quantity -= quantity;

  if (stock.quantity === 0) {
    portfolio.stocks = portfolio.stocks.filter(s => s.symbol !== symbol);
  }

  await Trade.create({ symbol, price, type: 'sell', quantity });
  return { message: `Sold ${quantity} shares of ${symbol} at $${price}` };
}
