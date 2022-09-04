const express = require('express');
const router = express.Router();
const joinServerController = require('../controllers/joinServerController');

router.post('/', joinServerController.joinServer)

module.exports = router;