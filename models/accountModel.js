// models/userAccount.js

const mongoose = require('mongoose');

const userAccountSchema = new mongoose.Schema({
    userAccountName: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('UserAccount', userAccountSchema);