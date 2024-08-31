const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    // You can add other fields here if needed
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
