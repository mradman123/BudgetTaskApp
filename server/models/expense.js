var mongoose = require('mongoose');

var Expense = mongoose.model('Expense',{
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  amount: {
    type: Number,
    required: true,
    default: 0
  },
  category: {
    type: String,
    required: true,
    default: "Other"
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
