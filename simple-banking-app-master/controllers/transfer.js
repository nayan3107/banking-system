const asyncHandler = require('../middleware/async');
const errorHandler = require('../middleware/error');
const User = require('../models/Customer');
const Transfer = require('../models/Transfer');
const ErrorResponse = require('../utils/errorResponse');

// @desc      user transactions
// @route     GET /api/v1/transfers/:id
// @acess     Public

exports.getUserTransactions = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const transactions = await Transfer.find({ sentFrom: id })
    .sort({
      createdAt: -1,
    })
    .populate('sentFrom sentTo');

  res.status(200).json({
    success: true,
    data: transactions,
  });
});

// @desc      add amount
// @route     POST /api/v1/transfers/add
// @access    Public

exports.addAmount = asyncHandler(async (req, res, next) => {
  const { amount, remark, sentFrom } = req.body;
  const userDetails = await User.findById(sentFrom);

  const user = await User.findByIdAndUpdate(
    sentFrom,
    {
      currentBalance: userDetails.currentBalance + amount,
    },
    { new: true, runValidators: true }
  );

  const transfer = await Transfer.create({
    sentFrom: user._id,
    amountSent: amount,
    mode: 'self',
    remark,
  });

  res.status(200).json({
    success: true,
    data: {
      user: user,
      tranfer: transfer,
    },
  });
});

// @desc      transfer money
// @route     POST /api/v1/transfer
// @access    Public

exports.transferAmount = asyncHandler(async (req, res, next) => {
  const { amount, remark, sentFrom, sentTo } = req.body;
  const sendingUserDetails = await User.findById(sentFrom);
  const recievingUserDetails = await User.findById(sentTo);

  if (amount > sendingUserDetails.currentBalance) {
    throw new ErrorResponse('Insufficient Fundes!');
  }

  const sendingUser = await User.findByIdAndUpdate(
    sentFrom,
    {
      currentBalance: sendingUserDetails.currentBalance - amount,
    },
    { new: true, runValidators: true }
  );

  const recievingUser = await User.findByIdAndUpdate(
    sentTo,
    {
      currentBalance: recievingUserDetails.currentBalance + amount,
    },
    { new: true, runValidators: true }
  );

  const transfer = await Transfer.create({
    sentFrom: sendingUserDetails._id,
    sentTo: recievingUserDetails._id,
    amountSent: amount,
    remark,
  });

  const transferDetails = await Transfer.findById(transfer._id).populate(
    'sentFrom sentTo'
  );

  res.status(200).json({
    success: true,
    data: transferDetails,
  });
});
