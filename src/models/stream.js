const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let streamSchema = new Schema({
    owner: String,
    twitchId: String,
    offset: Number,
    transcription: [{
        text: String,
        timeStamp: Number
    }],
    updatedAt: { 'type': Date, 'default': Date.now() },
});

module.exports = mongoose.model('stream', streamSchema)