const mail = require('../utils/Mail');
const ebay = require('../services/EbayServices');

class AlertOperations {
  constructor() {
    this.sendSubscribedMail = this.sendSubscribedMail.bind(this);
  }

  /**
   *
   * @param {String} email
   * @param {String} phrase
   */
  async sendSubscribedMail(email, phrase) {
    const resultadoFormatado = await ebay.findPhrase(phrase);

    await mail.sendMail({
      to: email,
      subject: 'Scheduled Email',
      template: 'scheduled',
      context: {
        items: resultadoFormatado,
      },
    });
  }
}

module.exports = new AlertOperations();
