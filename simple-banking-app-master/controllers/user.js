const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/Customer');

// @desc      get todos
// @route     GET /api/v1/users
// @access    Public
module.exports.getAllCustomers = asyncHandler(async (req, res, next) => {
  const users = await User.find({});
  res.status(200).json({
    success: true,
    data: users,
  });
});

// @desc      get todos
// @route     GET /api/v1/users/:id
// @access    Public
module.exports.getCustomer = asyncHandler(async (req, res, next) => {
  const users = await User.findById(req.params.id);
  res.status(200).json({
    success: true,
    data: users,
  });
});
