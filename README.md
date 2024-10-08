# Stock Trading API
=====================

This API provides a set of endpoints for managing a stock portfolio.

## Endpoints
------------

### GET /api/stock/:symbol

* **Description:** Fetch the latest price of a stock.
* **Example:** `GET /api/stock/AAPL`

### POST /api/trade

* **Description:** Buy or sell a stock.
* **Example:** See examples below.

#### Trade Examples:

* Buy 10 shares of AAPL: `POST /api/trade { "symbol": "AAPL", "quantity": 10, "action": "buy" }`
* Sell 5 shares of GOOG: `POST /api/trade { "symbol": "GOOG", "quantity": 5, "action": "sell" }`

### GET /api/portfolio

* **Description:** View the entire portfolio (balance & stocks).
* **Example:** `GET /api/portfolio`

### GET /api/portfolio/stock/:symbol

* **Description:** View details of a specific stock in portfolio.
* **Example:** `GET /api/portfolio/stock/AAPL`

### GET /api/report

* **Description:** Generate a profit/loss report.
* **Example:** `GET /api/report`

**Note:** This README file provides a brief overview of the available endpoints and their usage. For more detailed information, please refer to the API documentation.