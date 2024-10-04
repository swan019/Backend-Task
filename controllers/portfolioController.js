const Portfolio = require('../models/portfolioModel');

// Get entire portfolio (stocks owned and balance)
exports.getPortfolio = async (req, res) => {
  const portfolio = await Portfolio.findOne();
  res.status(200).json(portfolio);
};

// Get a specific stock position from the portfolio
exports.getStockPosition = async (req, res) => {
  const symbol = req.params.symbol;
  const portfolio = await Portfolio.findOne();
  const stock = portfolio.stocks.find(stock => stock.symbol === symbol);
  if (stock) {
    res.status(200).json(stock);
  } else {
    res.status(404).json({ message: 'Stock not found in portfolio' });
  }
};

// Create or update portfolio with initial balance
exports.createPortfolio = async (req, res) => {
  const { balance } = req.body;

  // Check if balance is provided
  if (!balance || balance <= 0) {
    return res.status(400).json({ message: 'A valid initial balance is required' });
  }

  try {
    // Check if a portfolio already exists
    let portfolio = await Portfolio.findOne();
    
    if (!portfolio) {
      // If no portfolio exists, create a new one with the provided balance
      portfolio = new Portfolio({
        balance: balance,
        stocks: []  // Empty stock array initially
      });
      await portfolio.save();
      return res.status(201).json({ message: 'Portfolio created successfully', portfolio });
    } else {
      // If portfolio exists, update the balance
      portfolio.balance += balance;
      await portfolio.save();
      return res.status(200).json({ message: 'Balance updated successfully', portfolio });
    }
  } catch (error) {
    console.error('Error creating/updating portfolio:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
