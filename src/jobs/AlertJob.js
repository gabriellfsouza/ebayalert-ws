const alert = require('../services/AlertOperations');

class AlertJob {
  get key() {
    return 'AlertJob';
  }

  async handle({ data }) {
    const { email, phrase } = data;
    return alert.sendSubscribedMail(email, phrase);
  }
}

module.exports = new AlertJob();
