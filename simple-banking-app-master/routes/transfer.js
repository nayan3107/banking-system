const express = require('express');
const {
  addAmount,
  transferAmount,
  getUserTransactions,
} = require('../controllers/transfer');

const router = express.Router();

router.post('/', transferAmount);
router.post('/add', addAmount);
router.get('/:id', getUserTransactions);

module.exports = router;
