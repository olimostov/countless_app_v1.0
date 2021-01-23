const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: [true, 'Please add an amount']
  },
  comment: {
    type: String,
    required: false
  },
  transaction_group: {
    type: String,
    required: true,
    enum: ['Expenses', 'Income']
  },
  category_Id: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category'
  },
  sub_category_Id: {
    type: mongoose.Schema.ObjectId,
    ref: 'Subcategory'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Transaction', TransactionSchema);
