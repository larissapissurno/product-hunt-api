const mongoose = require('mongoose');

const Product = mongoose.model('Product');

module.exports = {
  async index(req, res) {
    const { page = 1 } = req.query;

    const products = await Product.paginate({}, {page, limit: 10});

    return res.json(products);
  },

  async show(req, res) {
    const { id } = req.params;
    const product = await Product.findById(id);

    return res.json(product);
  },

  async store(req, res) {
    const product = await Product.create(req.body);

    return res.json(product);
  },

  async update(req, res) {
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(id, req.body, { new: true });

    return res.json(product);
  },

  async destroy(req, res) {
    const { id } = req.params;
    await Product.findByIdAndRemove(id);

    return res.send();
  },
}