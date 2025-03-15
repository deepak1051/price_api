import express from 'express';
const router = express.Router();

import auth from '../middlewares/auth.js';
import {
  createProduct,
  getPriceHistory,
  getProductById,
  getProducts,
  getProductsByCategory,
  searchProducts,
  updateProductPrices,
} from '../controllers/productController.js';

router.get('/', getProducts);

router.get('/search', searchProducts);

router.get('/category/:category', getProductsByCategory);

router.get('/price-history/:id', getPriceHistory);

router.get('/:id', getProductById);

router.post('/', auth, createProduct);

router.put('/:id', auth, updateProductPrices);

export default router;
