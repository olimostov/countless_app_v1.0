const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  category_name: {
    type: String,
    required: [true, 'Please enter a category']
  }
});

module.exports = mongoose.model('Category', CategorySchema);
