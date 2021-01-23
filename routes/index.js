const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');

const Transaction = require('../models/Transaction');
// @desc    Login/Landing Page
// @route   GET /
router.get('/', ensureGuest, (req, res) => {
  res.render('login', {
    layout: 'login'
  });
});

// @desc    Dashboard
// @route   GET /dashboard
router.get('/dashboard', ensureAuth, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id }).lean();
    res.render('dashboard', {
      name: req.user.firstName,
      transactions
    });
  } catch (error) {
    console.error(error);
    res.render('error/500');
  }
});

module.exports = router;
