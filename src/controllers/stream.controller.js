const crypto = require('crypto')
const jwt = require('jsonwebtoken');
const dbStream = require('../db/stream.db');
const validation = require('../middleware/validation');


async function createStream(req, res) {
    let create = await dbStream.createStreamDataBase(req.body)
    if (!create) return res.status(403).json({ 'error': 'something wrong' })

    return res.status(200).json({ "message": "Hey!" })
}




module.exports = { createStream }