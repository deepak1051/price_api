import express from 'express';
const router = express.Router();

import auth from '../middlewares/auth.js';
import {
  addItemToWishlist,
  createOrUpdateWishlist,
  getWishlistByMonth,
  getWishlists,
  removeWishlistItem,
  updateWishlistItem,
} from '../controllers/wishlistController.js';

router.get('/', auth, getWishlists);

router.get('/:month/:year', auth, getWishlistByMonth);

router.post('/', auth, createOrUpdateWishlist);

router.post('/item', auth, addItemToWishlist);

router.put('/item/:itemId', auth, updateWishlistItem);

router.delete('/item/:itemId', auth, removeWishlistItem);

export default router;
