import Product from '../models/Product.js';

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ date: -1 });
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const searchProducts = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ msg: 'Search query is required' });
    }

    const products = await Product.find({
      name: { $regex: query, $options: 'i' },
    }).sort({ date: -1 });

    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const createProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, description, category, image, prices } = req.body;

    const newProduct = new Product({
      name,
      description,
      category,
      image,
      prices,
    });

    const product = await newProduct.save();

    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const updateProductPrices = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    const { prices } = req.body;

    product.prices = prices || product.prices;

    await product.save();

    res.json(product);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find({
      category: req.params.category,
    }).sort({ date: -1 });

    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getPriceHistory = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    const priceHistory = {};

    product.prices.forEach((priceItem) => {
      const date = new Date(priceItem.date);
      const monthYear = `${date.getMonth() + 1}-${date.getFullYear()}`;

      if (!priceHistory[monthYear]) {
        priceHistory[monthYear] = {};
      }

      if (!priceHistory[monthYear][priceItem.store]) {
        priceHistory[monthYear][priceItem.store] = {
          totalPrice: 0,
          count: 0,
        };
      }

      priceHistory[monthYear][priceItem.store].totalPrice += priceItem.price;
      priceHistory[monthYear][priceItem.store].count += 1;
    });

    Object.keys(priceHistory).forEach((monthYear) => {
      Object.keys(priceHistory[monthYear]).forEach((store) => {
        const storeData = priceHistory[monthYear][store];
        priceHistory[monthYear][store] = storeData.totalPrice / storeData.count;
      });
    });

    res.json(priceHistory);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.status(500).json({ message: 'Server Error' });
  }
};
