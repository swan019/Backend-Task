const finnhub = require('finnhub');
const { finnhubApiKey } = require('../config/config');

// Configure Finnhub client
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = finnhubApiKey;
const finnhubClient = new finnhub.DefaultApi();

// Fetch stock price from Finnhub API
exports.getStockPrice = async (symbol) => {
  return new Promise((resolve, reject) => {
    finnhubClient.quote(symbol, (error, data, response) => {
      if (error) {
        console.error(`Error fetching stock price for ${symbol}:`, error);
        reject(null);
      } else {
        resolve(data.c); // 'c' represents the current stock price
      }
    });
  });
};
