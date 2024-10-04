const express = require('express');
const router = express.Router();
const { initiateTrade, getStockPrice } = require('../controllers/tradingController');

// Route to initiate a trade (buy/sell)
router.post('/trade', initiateTrade);

// Route to fetch stock price
router.get('/stock/:symbol', getStockPrice);

module.exports = router;
