var mongoose = require('mongoose');

var Expense = mongoose.model('Expense',{
  amount: {
    type: Number,
    required: true,
    default: 0
  },
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  recurring:{
    type: Boolean,
    default: false
  },
  start:{
    type: Date,
    default: Date.now,
    required: true
  },
  end:{
      type: Date,
      default: Date.now
  }
});

module.exports = {Expense};
