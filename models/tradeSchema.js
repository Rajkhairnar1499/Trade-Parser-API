const mongoose = require("mongoose");

const tradeSchema = new mongoose.Schema({
  utcTime: {
    type: Date,
    required: true,
  },
  operation: {
    type: String,
    enum: ["buy", "sell"],
    required: true,
  },
  baseCoin: {
    type: String,
    required: true,
  },
  quoteCoin: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Trade = mongoose.model("Trade", tradeSchema);

module.exports = {
  Trade,
};
