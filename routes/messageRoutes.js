const express = require("express");
const { getMessages, sendMessage } = require("../controllers/messageController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// Fetch old messages
router.get("/:userId", auth, getMessages);

// Save a new message
router.post("/", auth, sendMessage);

module.exports = router;
