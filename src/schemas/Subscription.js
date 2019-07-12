const mongoose = require('mongoose');

const { Schema } = mongoose;

function arraySize(val) {
  return val.length <= 3 || val.length === 0;
}

const SubscriptionSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  interval: {
    type: Number,
    required: true,
  },
  phrases: {
    type: [String],
    required: true,
    validate: [arraySize, '{PATH} size is out of range or empty'],
  },
});

module.exports = mongoose.model('Subscription', SubscriptionSchema);
