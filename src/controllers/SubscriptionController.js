const Subscription = require('../schemas/Subscription');

class SubscriptionController {
  async index(req, res) {
    const { _id } = req.params;
    const { phrases, interval, email } = req.body;
    if (_id) {
      const result = await Subscription.findById(_id);
      if (!result || (result && result.deleted)) return res.status(404).send();
      return res.status(200).json(result);
    }

    const query = {};
    if (phrases !== undefined) query.phrases = phrases;
    if (interval !== undefined) query.interval = interval;
    if (email !== undefined) query.email = email;

    const result = await Subscription.find({
      ...query,
      deleted: false,
    });

    return res.status(200).json(result);
  }

  async store(req, res) {
    let { phrases } = req.body;
    const { interval, email } = req.body;
    let _id;
    phrases = phrases.sort((a, b) => a.localeCompare(b));

    const exists = await Subscription.findOne({ email, phrases });
    /**
     * Verifica se o objeto existe, se foi deletado e, caso não exista, cria um novo.
     */
    if (exists && exists.deleted === false) return res.status(409).json({ error: 'subscription for this search already exists' });
    if (exists && exists.deleted === true) {
      exists.deleted = false;
      _id = exists._id;
      await exists.save();
    }
    if (!exists) {
      const subscription = await new Subscription({ interval, email, phrases });
      _id = (await subscription.save())._id;
    }
    return res.status(200).json({
      _id,
      interval,
      email,
      phrases,
    });
  }

  async delete(req, res) {
    const { _id } = req.params;

    await Subscription.findByIdAndUpdate(_id, { deleted: true }, { new: true });

    return res.status(201).send();
  }

  async update(req, res) {
    const { _id } = req.params;
    const { phrases, email, interval } = req.body;

    const exists = await Subscription.findByIdAndUpdate(
      _id,
      {
        phrases,
        email,
        interval,
        deleted: false,
      },
      { new: true },
    );

    if (!exists) return res.status(404).json({ error: 'subscription not found' });

    return res.status(200).send(exists);
  }
}

module.exports = new SubscriptionController();
