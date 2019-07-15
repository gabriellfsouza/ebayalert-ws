const mongoose = require('mongoose');

const { Schema } = mongoose;

function options(val) {
  const values = [2, 10, 30];
  return values.find(v => v === val) ? true : false;
}

const SubscriptionSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    interval: {
      type: Number,
      required: true,
      validate: [options, 'only accepts 2, 10 or 30 minutes interval'],
    },
    deleted: {
      type: Boolean,
      require: true,
      default: false,
    },
    phrase: {
      type: String,
      required: true,
    },
    next: {
      type: Date,
      required: true,
      default: new Date(),
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Subscription', SubscriptionSchema);
