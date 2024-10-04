require('dotenv').config();

module.exports = {
  finnhubApiKey: process.env.FINNHUB_API_KEY, // Add the API key here
  dbUrl: process.env.DB_URL
};
