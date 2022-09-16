const router = require("express").Router();
const messageController = require('../controllers/messageController')

//add
router.post("/", messageController.addMessage);

//get
router.get("/:channelId", messageController.getMessage);

module.exports = router;