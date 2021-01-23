const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');

const Transaction = require('../models/Transaction');
// @desc    Show add page
// @route   GET /transactions/add
router.get('/', ensureGuest, (req, res) => {
  res.render('login', {
    layout: 'login'
  });
});

module.exports = router;
