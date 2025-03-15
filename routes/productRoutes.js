import express from "express";
const router = express.Router();

import auth from "../middlewares/auth.js";
import {
  createProduct,
  getPriceHistory,
  getProductById,
  getProducts,
  getProductsByCategory,
  searchProducts,
  updateProductPrices,
} from "../controllers/productController.js";
// @route   GET api/products
// @desc    Get all products
// @access  Public
router.get("/", getProducts);

// @route   GET api/products/search
// @desc    Search products by name
// @access  Public
router.get("/search", searchProducts);

// @route   GET api/products/category/:category
// @desc    Get products by category
// @access  Public
router.get("/category/:category", getProductsByCategory);

// @route   GET api/products/price-history/:id
// @desc    Get price history of a product
// @access  Public
router.get("/price-history/:id", getPriceHistory);

// @route   GET api/products/:id
// @desc    Get product by ID
// @access  Public
router.get("/:id", getProductById);

// @route   POST api/products
// @desc    Create a product (for admin purposes)
// @access  Private (admin only)
router.post("/", auth, createProduct);

// @route   PUT api/products/:id
// @desc    Update product prices (for admin purposes)
// @access  Private (admin only)
router.put("/:id", auth, updateProductPrices);

export default router;
