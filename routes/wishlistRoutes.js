import express from "express";
const router = express.Router();

import auth from "../middlewares/auth.js";
import {
  addItemToWishlist,
  createOrUpdateWishlist,
  getWishlistByMonth,
  getWishlists,
  removeWishlistItem,
  updateWishlistItem,
} from "../controllers/wishlistController.js";
// @route   GET api/wishlist
// @desc    Get all wishlists for a user
// @access  Private
router.get("/", auth, getWishlists);

// @route   GET api/wishlist/:month/:year
// @desc    Get wishlist for a specific month and year
// @access  Private
router.get("/:month/:year", auth, getWishlistByMonth);

// @route   POST api/wishlist
// @desc    Create or update wishlist
// @access  Private
router.post("/", auth, createOrUpdateWishlist);

// @route   POST api/wishlist/item
// @desc    Add item to wishlist
// @access  Private
router.post("/item", auth, addItemToWishlist);

// @route   PUT api/wishlist/item/:itemId
// @desc    Update item in wishlist
// @access  Private
router.put("/item/:itemId", auth, updateWishlistItem);

// @route   DELETE api/wishlist/item/:itemId
// @desc    Remove item from wishlist
// @access  Private
router.delete("/item/:itemId", auth, removeWishlistItem);

export default router;
