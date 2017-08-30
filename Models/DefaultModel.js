const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    name: { type: String, required: true },
    content: { type: String, required: false },
    id: { type: String, required: true },
    date: { type: Date, required: true }
});
