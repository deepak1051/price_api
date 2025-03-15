import Wishlist from '../models/Wishlist.js';
import Product from '../models/Product.js';

// @route   GET api/wishlist
// @desc    Get all wishlists for a user
// @access  Private
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

// @route   GET api/wishlist/:month/:year
// @desc    Get wishlist for a specific month and year
// @access  Private
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

// @route   POST api/wishlist
// @desc    Create or update wishlist
// @access  Private
export const createOrUpdateWishlist = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { month, year } = req.body;

    // Check if wishlist exists
    let wishlist = await Wishlist.findOne({
      user: req.user.id,
      month,
      year: parseInt(year),
    });

    if (!wishlist) {
      // Create new wishlist
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

// @route   POST api/wishlist/item
// @desc    Add item to wishlist
// @access  Private
export const addItemToWishlist = async (req, res) => {
  try {
    const { productId, store, price, month, year } = req.body;

    // Validate product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Find or create wishlist
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

    // Check if item already exists
    const itemExists = wishlist.items.find(
      (item) => item.product.toString() === productId && item.store === store
    );

    if (itemExists) {
      return res
        .status(400)
        .json({ message: 'Item already exists in wishlist' });
    }

    // Add item to wishlist
    wishlist.items.push({
      product: productId,
      store,
      price,
      purchased: false,
    });

    await wishlist.save();

    // Populate product details for the response
    // await wishlist
    //   .populate('items.product', ['name', 'description', 'image'])
    //   .execPopulate() ;

    res.json(wishlist);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// @route   PUT api/wishlist/item/:itemId
// @desc    Update item in wishlist
// @access  Private
export const updateWishlistItem = async (req, res) => {
  try {
    const { purchased } = req.body;
    const { itemId } = req.params;

    // Find all user wishlists
    const wishlists = await Wishlist.find({ user: req.user.id });

    // Find wishlist containing the item
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

    // Update item
    targetWishlist.items[itemIndex].purchased = purchased;

    if (purchased) {
      targetWishlist.items[itemIndex].purchaseDate = Date.now();
    } else {
      targetWishlist.items[itemIndex].purchaseDate = null;
    }

    await targetWishlist.save();

    // Populate product details for the response
    // await targetWishlist
    //   .populate('items.product', ['name', 'description', 'image'])
    //   .execPopulate();

    res.json(targetWishlist);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route   DELETE api/wishlist/item/:itemId
// @desc    Remove item from wishlist
// @access  Private
export const removeWishlistItem = async (req, res) => {
  try {
    const { itemId } = req.params;

    // Find all user wishlists
    const wishlists = await Wishlist.find({ user: req.user.id });

    // Find wishlist containing the item
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

    // Remove item
    targetWishlist.items.splice(itemIndex, 1);

    await targetWishlist.save();

    res.json(targetWishlist);
  } catch (err) {
    console.log(err);
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
