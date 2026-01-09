const { Transaction, Product, User } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      include: [
        { model: Product, attributes: ['name', 'sku', 'stock'] },
        { model: User, attributes: ['name', 'email'] }
      ],
      order: [['id', 'DESC']]
    });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { product_id, type, quantity } = req.body;

    // Pastikan semua field ada
    if (!product_id || !type || !quantity)
      return res.status(400).json({ message: 'All fields are required' });

    // Pastikan user dari JWT ada di DB
    const user = await User.findByPk(req.user.id);
    if (!user)
      return res.status(400).json({ message: 'User not found. Check your token.' });

    // Pastikan produk ada
    const product = await Product.findByPk(product_id);
    if (!product)
      return res.status(404).json({ message: 'Product not found' });

    // Update stok
    if (type === 'IN') {
      product.stock += quantity;
    } else if (type === 'OUT') {
      if (product.stock < quantity)
        return res.status(400).json({ message: 'Stock not enough' });
      product.stock -= quantity;
    } else {
      return res.status(400).json({ message: 'Invalid transaction type' });
    }

    await product.save();

    // Simpan transaksi dengan user_id dari JWT
    const transaction = await Transaction.create({
      product_id,
      user_id: req.user.id, // otomatis dari token
      type,
      quantity
    });

    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const transaction = await Transaction.findByPk(req.params.id);
    if (!transaction)
      return res.status(404).json({ message: 'Transaction not found' });

    // Revert stok saat hapus transaksi
    const product = await Product.findByPk(transaction.product_id);
    if (transaction.type === 'IN') {
      product.stock -= transaction.quantity;
    } else if (transaction.type === 'OUT') {
      product.stock += transaction.quantity;
    }
    await product.save();

    await transaction.destroy();
    res.json({ message: 'Transaction deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
