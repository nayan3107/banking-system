const mongoose = require('mongoose');

const TransferSchema = new mongoose.Schema(
  {
    sentFrom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'customer',
      required: true,
    },
    mode: {
      type: String,
      enum: ['self', 'other'],
      default: 'other',
    },
    sentTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'customer',
    },
    amountSent: {
      type: Number,
      required: true,
    },
    remark: {
      type: String,
      // required: [true, 'Remark for the transaction is required!'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('transfer', TransferSchema);
