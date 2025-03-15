import express from 'express';
const router = express.Router();

import auth from '../middlewares/auth.js';
import {
  createOrUpdateBudget,
  getBudgetByMonth,
  getBudgetComparison,
  getBudgets,
  getBudgetSummary,
} from '../controllers/budgetController.js';

router.get('/', auth, getBudgets);

router.get('/:month/:year', auth, getBudgetByMonth);

router.post('/', auth, createOrUpdateBudget);

router.get('/summary/:month/:year', auth, getBudgetSummary);

router.get('/comparison', auth, getBudgetComparison);

export default router;
