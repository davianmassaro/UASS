exports.createTransaction = async (req, res) => {
  const { productId, type, quantity } = req.body;

  const product = await Product.findByPk(productId);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  if (type === 'OUT' && product.stock < quantity) {
    return res.status(400).json({ message: 'Stock not sufficient' });
  }

  await Transaction.create({
    productId,
    userId: req.user.id,
    type,
    quantity
  });

  product.stock += type === 'IN' ? quantity : -quantity;
  await product.save();

  res.status(201).json({ message: 'Transaction success' });
};
