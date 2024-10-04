const express = require('express');
const router = express.Router();
const { getProfitLossReport } = require('../controllers/reportController');

// Route to get profit/loss report
router.get('/report', getProfitLossReport);

module.exports = router;
