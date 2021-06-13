const express = require('express');
const { getCustomer, getAllCustomers } = require('../controllers/user');

const router = express.Router();

router.get('/', getAllCustomers);
router.get('/:id', getCustomer);

module.exports = router;
