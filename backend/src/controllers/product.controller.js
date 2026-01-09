const { Product } = require('../models');

// GET semua produk
exports.getAll = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE produk baru
exports.create = async (req, res) => {
  try {
    const { name, sku, stock, price } = req.body;

    // cek apakah SKU sudah ada
    const exists = await Product.findOne({ where: { sku } });
    if (exists) {
      return res.status(400).json({ message: `SKU '${sku}' sudah ada` });
    }

    const product = await Product.create({ name, sku, stock, price });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE produk (admin)
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, sku, stock, price } = req.body;

    // cek apakah produk ada
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // cek duplikasi SKU jika diganti
    if (sku && sku !== product.sku) {
      const exists = await Product.findOne({ where: { sku } });
      if (exists) return res.status(400).json({ message: `SKU '${sku}' sudah ada` });
    }

    await product.update({ name, sku, stock, price });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE produk (admin)
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    await product.destroy();
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
