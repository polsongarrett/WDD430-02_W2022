const mongoose = require('mongoose');

const entrySchema = mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Entry', entrySchema);

