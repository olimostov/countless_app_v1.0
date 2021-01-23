const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please enter a category'],
    enum: [
      'Everyday',
      'Education',
      'Entertainment',
      'Child',
      'Gifts',
      'Insurance',
      'Health/medical',
      'Utilities',
      'Home',
      'Technology',
      'Transportation',
      'Travel',
      'Wages',
      'Other'
    ]
  }
});

module.exports = mongoose.model('Category', CategorySchema);
