const mongoose = require('mongoose');

const SubCategorySchema = new mongoose.Schema({
  category_Id: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category'
  },
  sub_category_name: {
    type: String,
    required: [true, 'Please enter a sub-category']
  }
});

module.exports = mongoose.model('Subcategory', SubCategorySchema);
