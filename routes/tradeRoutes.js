const express = require("express");
const multer = require("multer");
const tradeController = require("../controllers/tradeController"); // Adjust path as necessary

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // Specify the destination for the uploaded files

router.post("/upload", upload.single("file"), tradeController.uploadFile);
router.post("/getBalance", tradeController.getBalance);


// Export the router directly
module.exports = router;
