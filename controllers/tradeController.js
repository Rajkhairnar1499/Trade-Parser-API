const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");
// const Trade = require("../models/Trade");
const moment = require("moment");
const { Trade } = require("../models/tradeSchema");

// Set up file storage
const upload = multer({ dest: "uploads/" });

// Function to handle CSV file upload and parse
// exports.uploadFile = async (req, res) => {
//   const file = req.file;

//   if (!file) {
//     return res.status(400).json({ message: "Please upload a CSV file" });
//   }

//   const trades = [];

//   fs.createReadStream(file.path)
//     .pipe(csv())
//     .on("data", (row) => {
//       const [baseCoin, quoteCoin] = row.Market.split("/");
//       const trade = new Trade({
//         utcTime: moment(row.UTC_Time, "YYYY-MM-DD HH:mm:ss").toDate(),
//         operation: row.Operation,
//         baseCoin,
//         quoteCoin,
//         amount: parseFloat(row["Buy/Sell Amount"]),
//         price: parseFloat(row.Price),
//       });
//       trades.push(trade);
//     })
//     .on("end", async () => {
//       await Trade.insertMany(trades);
//       res
//         .status(200)
//         .json({ message: "Trades uploaded and stored in database" });
//       fs.unlinkSync(file.path); // Clean up the uploaded file
//     });
// };

// Function to handle CSV file upload and parse
exports.uploadFile = async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: "Please upload a CSV file" });
  }

  const trades = [];

  fs.createReadStream(file.path)
    .pipe(csv())
    .on("data", (row) => {
      const [baseCoin, quoteCoin] = row.Market.split("/");
      const trade = new Trade({
        utcTime: moment(row.UTC_Time, "YYYY-MM-DD HH:mm:ss").toDate(),
        operation: row.Operation.toLowerCase(), // Convert to lowercase
        baseCoin,
        quoteCoin,
        amount: parseFloat(row["Buy/Sell Amount"]),
        price: parseFloat(row.Price),
      });
      trades.push(trade);
    })
    .on("end", async () => {
      await Trade.insertMany(trades);
      res.status(200).json({ message: "Trades uploaded and stored in database" });
      fs.unlinkSync(file.path); // Clean up the uploaded file
    });
};


exports.getBalance = async (req, res) => {
  const { timestamp } = req.body;
  const endDate = moment(timestamp, "YYYY-MM-DD HH:mm:ss").toDate();

  const trades = await Trade.find({ utcTime: { $lte: endDate } });

  const balances = trades.reduce((acc, trade) => {
    if (!acc[trade.baseCoin]) acc[trade.baseCoin] = 0;
    acc[trade.baseCoin] +=
      trade.operation === "buy" ? trade.amount : -trade.amount;
    return acc;
  }, {});

  res.json(balances);
};
