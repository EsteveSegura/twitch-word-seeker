const rateLimit = require('express-rate-limit');

const apiRegularLimit = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { "error": "Too many requests." }
})

const createAccountLimit = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 19,
    message: { "error": "To many attempts to register." }
})

const editAccountLimit = rateLimit({
    windowMs: 60 * 25 * 1000,
    max: 4,
    message: { "error": "To many attempts to edit." }
})

const loginAccountLimit = rateLimit({
    windowMs: 60 * 15 * 1000,
    max: 10,
    message: { "error": "Too many attempts to login." }
})

module.exports = { apiRegularLimit, createAccountLimit, loginAccountLimit, editAccountLimit }