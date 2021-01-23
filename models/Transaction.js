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
  date: Date,
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
  }
});

module.exports = mongoose.model('Transaction', TransactionSchema);
