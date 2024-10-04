const express = require('express');
const router = express.Router();
const {createPortfolio,  getPortfolio, getStockPosition } = require('../controllers/portfolioController');

// Route to get the entire portfolio
router.get('/portfolio', getPortfolio);

// Route to get a specific stock in the portfolio
router.get('/portfolio/stock/:symbol', getStockPosition);

// Route to create or update a portfolio with a balance
router.post('/portfolio', createPortfolio);

module.exports = router;
