import Wishlist from '../models/Wishlist.js';
import Product from '../models/Product.js';

export const getWishlists = async (req, res) => {
  try {
    const wishlists = await Wishlist.find({ user: req.user.id })
      .sort({ year: -1, month: -1 })
      .populate('items.product', ['name', 'description', 'image']);

    res.json(wishlists);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const getWishlistByMonth = async (req, res) => {
  try {
    const { month, year } = req.params;

    const wishlist = await Wishlist.findOne({
      user: req.user.id,
      month,
      year: parseInt(year),
    }).populate('items.product', ['name', 'description', 'image']);

    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    res.json(wishlist);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const createOrUpdateWishlist = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { month, year } = req.body;

    let wishlist = await Wishlist.findOne({
      user: req.user.id,
      month,
      year: parseInt(year),
    });

    if (!wishlist) {
      wishlist = new Wishlist({
        user: req.user.id,
        month,
        year: parseInt(year),
        items: [],
      });
    }

    await wishlist.save();

    res.json(wishlist);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const addItemToWishlist = async (req, res) => {
  try {
    const { productId, store, price, month, year } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let wishlist = await Wishlist.findOne({
      user: req.user.id,
      month,
      year: parseInt(year),
    });

    if (!wishlist) {
      wishlist = new Wishlist({
        user: req.user.id,
        month,
        year: parseInt(year),
        items: [],
      });
    }

    const itemExists = wishlist.items.find(
      (item) => item.product.toString() === productId && item.store === store
    );

    if (itemExists) {
      return res
        .status(400)
        .json({ message: 'Item already exists in wishlist' });
    }

    wishlist.items.push({
      product: productId,
      store,
      price,
      purchased: false,
    });

    await wishlist.save();

    res.json(wishlist);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

export const updateWishlistItem = async (req, res) => {
  try {
    const { purchased } = req.body;
    const { itemId } = req.params;

    const wishlists = await Wishlist.find({ user: req.user.id });

    let targetWishlist = null;
    let itemIndex = -1;

    for (const wishlist of wishlists) {
      itemIndex = wishlist.items.findIndex(
        (item) => item._id.toString() === itemId
      );
      if (itemIndex !== -1) {
        targetWishlist = wishlist;
        break;
      }
    }

    if (!targetWishlist) {
      return res
        .status(404)
        .json({ message: 'Item not found in any wishlist' });
    }

    targetWishlist.items[itemIndex].purchased = purchased;

    if (purchased) {
      targetWishlist.items[itemIndex].purchaseDate = Date.now();
    } else {
      targetWishlist.items[itemIndex].purchaseDate = null;
    }

    await targetWishlist.save();

    res.json(targetWishlist);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const removeWishlistItem = async (req, res) => {
  try {
    const { itemId } = req.params;

    const wishlists = await Wishlist.find({ user: req.user.id });

    let targetWishlist = null;
    let itemIndex = -1;

    for (const wishlist of wishlists) {
      itemIndex = wishlist.items.findIndex(
        (item) => item._id.toString() === itemId
      );
      if (itemIndex !== -1) {
        targetWishlist = wishlist;
        break;
      }
    }

    if (!targetWishlist) {
      return res
        .status(404)
        .json({ message: 'Item not found in any wishlist' });
    }

    targetWishlist.items.splice(itemIndex, 1);

    await targetWishlist.save();

    res.json(targetWishlist);
  } catch (err) {
    console.log(err);
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
