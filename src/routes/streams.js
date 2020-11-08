const express = require('express');
const router = express.Router();
const secure = require('../middleware/secure');
const rateLimit = require('../middleware/ratelimit')
const streamController = require('../controllers/stream.controller');

//user
router.post('/create', [secure.verifyToken, rateLimit.createAccountLimit], async (req, res) => await streamController.createStream(req, res))


module.exports = router