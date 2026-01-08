const Transaction = require('../models/transaction');
const Product = require('../models/product');

exports.create = async (req, res) => {
  const { product_id, type, quantity } = req.body;

  const product = await Product.findByPk(product_id);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  if (type === 'OUT' && product.stock < quantity) {
    return res.status(400).json({ message: 'Stock insufficient' });
  }

  await Transaction.create({
    product_id,
    user_id: req.user.id,
    type,
    quantity
  });

  product.stock += type === 'IN' ? quantity : -quantity;
  await product.save();

  res.status(201).json({ message: 'Transaction success' });
};
