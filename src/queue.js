require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

const { addMinutes, parseISO } = require('date-fns');
const queue = require('./utils/Queue');
const AlertJob = require('./jobs/AlertJob');
const Subscription = require('./schemas/Subscription');
const database = require('./database');
const { aggregationQueue } = require('./utils/mongo');

/* Subscription.find({
  $expr: { $lt: ['$updatedAt', new Date().getTime() - '$interval' * 6000] },
}).then((data) => {
  console.log(data.length);
  const { interval } = data;
  console.log(new Date() + interval * 6000);
}); */

async function sendNewAlerts() {
  const subscriptions = await Subscription.aggregate(aggregationQueue);
  console.log(subscriptions.length);
  subscriptions.forEach(async (s) => {
    const { email } = s;
    const phrase = s.phrases[0];
    queue.add(AlertJob.key, {
      email,
      phrase,
    });
    await s.save();
  });
}

setInterval(sendNewAlerts, 60 * 1000 * 2);

queue.processQueue();
