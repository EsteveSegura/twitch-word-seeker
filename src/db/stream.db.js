const stream = require('../models/stream')

async function createStreamDataBase(data) {
    let newStream = new stream(data)
    let saved = await newStream.save()
    return saved
}

async function editStreamDataBase(email, dataUpdate) {
    if (dataUpdate.hasOwnProperty('pw')) dataUpdate.pw = await user.encryptPassword(dataUpdate.pw)
    let doc = await user.findOneAndUpdate({ email: email }, { $set: dataUpdate }, { upsert: true, new: true })
    return doc
}

async function getStreamDataBase(data, filter) {
    let findUserAlreadyExists = await user.findOne({ email: data.email }, filter != null ? filter : "")
    return findUserAlreadyExists

}



module.exports = { createStreamDataBase, editStreamDataBase, getStreamDataBase }

/*

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


*/