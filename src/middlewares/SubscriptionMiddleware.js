const Yup = require('yup');

const schemaInclude = Yup.object().shape({
  interval: Yup.number().required(),
  email: Yup.string()
    .email()
    .required(),
  phrases: Yup.array()
    .of(Yup.string())
    .min(1)
    .max(3)
    .required(),
});

/**
 * Classe para cuidar da parte da entrada da mensagem.
 */
class SubscriptionMiddlware {
  async store(req, res, next) {
    try {
      await schemaInclude.validate(req.body);
      return next();
    } catch (error) {
      return res.status(400).json({ error: error.errors });
    }
  }

  async update(req, res, next) {
    try {
      await schemaInclude.validate(req.body);
      return next();
    } catch (error) {
      return res.status(400).json({ error: error.errors });
    }
  }
}

module.exports = new SubscriptionMiddlware();
