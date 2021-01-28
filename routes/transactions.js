const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');

const Transaction = require('../models/Transaction');
const Category = require('../models/Category');
const Subcategory = require('../models/Subcategory');
// const { deleteOne } = require('../models/Transaction');

// @desc    Show add page
// @route   GET /transactions/add
router.get('/add', ensureAuth, (req, res) => {
  res.render('transactions/add');
});

// @desc    Process add form
// @route   POST /transactions
router.post('/', ensureAuth, async (req, res) => {
  const category = req.body.transaction_category;
  const subCategory = req.body.transaction_sub_category;
  let category_id = '';
  let sub_category_id = '';
  const newCategory = { category_name: category };
  const newSubCategory = { sub_category_name: subCategory };
  console.log(req.body);
  try {
    let categoryInstance = await Category.findOne({ category_name: category });
    if (categoryInstance) {
      category_id = categoryInstance._id;
    } else {
      await Category.create(newCategory);
      categoryInstance = await Category.findOne(newCategory);
      category_id = categoryInstance._id;
    }
  } catch (err) {
    console.log(err);
  }
  try {
    let subCategoryInstance = await Subcategory.findOne({
      sub_category_name: subCategory
    });
    if (subCategoryInstance) {
      sub_category_id = subCategoryInstance._id;
    } else {
      await Subcategory.create(newSubCategory);
      subCategoryInstance = await Category.findOne(newSubCategory);
      sub_category_id = subCategoryInstance._id;
    }
  } catch (err) {
    console.log(err);
  }

  try {
    const newTransaction = {
      amount: req.body.amount,
      comment: req.body.comment,
      transaction_group: req.body.transaction_group,
      category_Id: category_id,
      sub_category_Id: sub_category_id,
      user: req.user.id,
      date: req.body.date
    };

    await Transaction.create(newTransaction);
    res.redirect('/dashboard');
  } catch (error) {
    console.log(error);
    res.render('error/500');
  }
});

// @desc    Show add (edit) page
// @route   GET /transactions/edit/:id
router.get('/edit/:id', ensureAuth, async (req, res) => {
  const category = Category.findOne();
  const subCategory = Subcategory.findOne();
  const transaction = await Transaction.findOne({
    _id: req.params.id
  })
    .populate(['category_Id', 'sub_category_Id', 'user'])
    .lean();
  console.log(transaction);

  if (!transaction) {
    return res.render('error/404');
  } else {
    res.render('transactions/edit', { transaction });
  }

  // if (transaction.user._id != req.user.id) {
  //   res.redirect('/transactions');
  // } else {
  // }
});

// @desc    Update4 transaction
// @route   PUT /transactions/:id
router.put('/:id', ensureAuth, async (req, res) => {
  try {
    let transaction = Transaction.findById(req.params.id).lean();
    let category = req.body.transaction_category;
    let subCategory = req.body.transaction_sub_category;
    let category_id = '';
    let sub_category_id = '';
    const newCategory = { category_name: category };
    const newSubCategory = { sub_category_name: subCategory };
    console.log(req.body);

    try {
      let categoryInstance = await Category.findOne({
        category_name: category
      });
      if (categoryInstance) {
        category_id = categoryInstance._id;
      } else {
        await Category.create(newCategory);
        categoryInstance = await Category.findOne(newCategory);
        category_id = categoryInstance._id;
      }
    } catch (err) {
      console.log(err);
    }
    try {
      let subCategoryInstance = await Subcategory.findOne({
        sub_category_name: subCategory
      });
      if (subCategoryInstance) {
        sub_category_id = subCategoryInstance._id;
      } else {
        await Subcategory.create(newSubCategory);
        subCategoryInstance = await Category.findOne(newSubCategory);
        sub_category_id = subCategoryInstance._id;
      }
    } catch (err) {
      console.log(err);
    }

    const updatedTransaction = {
      amount: req.body.amount,
      comment: req.body.comment,
      transaction_group: req.body.transaction_group,
      category_Id: category_id,
      sub_category_Id: sub_category_id,
      user: req.user.id,
      date: req.body.date
    };
    transaction = await Transaction.findByIdAndUpdate(
      { _id: req.params.id },
      updatedTransaction,
      {
        new: true,
        runValidators: true
      }
    );
    console.log(transaction);
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.redirect('error/500');
  }
});

//     if (!transaction) {
//     return res.render('error/404');
//   } else {
// transaction = await Transaction.findByIdAndUpdate(
//   { _id: req.params.id },
//   req.body,
//   {
//     new: true,
//     runValidators: true
//   }
// );
// console.log(transaction);
// res.redirect('/dashboard');
//   }
// });

// @desc    Delete transaction
// @route   DELETE /transactions/:id
router.delete('/:id', ensureAuth, async (req, res) => {
  try {
    await Transaction.deleteOne({ _id: req.params.id });
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    return res.render('error/500 ');
  }
});

module.exports = router;
