const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  name: { type: String, required: true },
  comment: { type: String }
});
