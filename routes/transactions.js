const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');

const Transaction = require('../models/Transaction');

// @desc    Show add page
// @route   GET /transactions/add
router.get('/add', ensureAuth, (req, res) => {
  res.render('transactions/add');
});

module.exports = router;
