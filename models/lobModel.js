// models/lob.js
const mongoose = require('mongoose');

const lobSchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Lob', lobSchema);