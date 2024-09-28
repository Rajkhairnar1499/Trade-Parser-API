<h1 align=center>
Trade Parser API
</h1> 

## Overview

The objective of this project is to develop a server-side application using Node.js and MongoDB that implements an API to parse cryptocurrency trade data from a CSV file and calculate account balances based on trades.

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- CSV Parser
- Postman

## Deployment
The project is successfully deployed on Render. You can access it at [Trade Parser API](https://trade-parser-api.onrender.com).

## API Endpoints

### File Upload Endpoint
- **URL**: `your-render-url-here/api/upload`
- **Method**: `POST`
- **Description**: Accepts a CSV file containing cryptocurrency trade data, parses it, and stores the information in the MongoDB database.

### Get Balance Endpoint
- **URL**: `your-render-url-here/api/getBalance`
- **Method**: `POST`
- **Description**: Returns the asset-wise balance of the account at a specified timestamp.
- **Request Body**:
    ```json
    {
      "timestamp": "2022-09-28 12:00:00"
    }
    ```
- **Expected Response**:
    ```json
    {
      "BTC": 15,
      "MATIC": 100
    }
    ```

## How to Test the API
To test your Express API after implementing the routes, you can use tools like Postman or cURL. Here’s how to do it with Postman:

### 1. Testing the File Upload Endpoint
1. Open Postman.
2. Select `POST` as the request type.
3. Enter the URL (e.g., `https://trade-parser-api.onrender.com/api/upload`).
4. Under the "Body" tab, select "form-data".
5. Add a key named `file` (make sure the key type is set to "File").
6. Choose a CSV file from your system to upload.
7. Click "Send" to submit the request.

### 2. Testing the Get Balance Endpoint
1. Select `POST` as the request type.
2. Enter the URL (e.g., `https://trade-parser-api.onrender.com/api/getBalance`).
3. Under the "Body" tab, select "raw" and choose JSON format.
4. Add the JSON payload (example):
    ```json
    {
      "timestamp": "2024-09-28 12:00:00"
    }
    ```
5. Click "Send" to submit the request.

## Conclusion
You can now test the API endpoints using Postman. Ensure that you replace `your-render-url-here` with the actual URL of your deployed application.

## Database Schema
The database schema is designed to store trade data parsed from the CSV file, including the following fields:
- `utc_time`: Date and time of the trade.
- `operation`: Type of trade (buy or sell).
- `market`: Market in which the trade occurred (e.g., BTC/INR).
- `buy_sell_amount`: Quantity of the base coin being traded.
- `price`: Price at which the trade was executed.

## Notes
- This project is designed as a production-grade application, following best practices for clean code and code structure.
- Version control has been utilized effectively to track changes throughout the project development.
