import express from "express";
const router = express.Router();

import auth from "../middlewares/auth.js";
import {
  createOrUpdateBudget,
  getBudgetByMonth,
  getBudgetComparison,
  getBudgets,
  getBudgetSummary,
} from "../controllers/budgetController.js";
// @route   GET api/budget
// @desc    Get all budgets for a user
// @access  Private
router.get("/", auth, getBudgets);

// @route   GET api/budget/:month/:year
// @desc    Get budget for a specific month and year
// @access  Private
router.get("/:month/:year", auth, getBudgetByMonth);

// @route   POST api/budget
// @desc    Create or update budget
// @access  Private
router.post("/", auth, createOrUpdateBudget);

// @route   GET api/budget/summary/:month/:year
// @desc    Get budget summary with wishlist totals
// @access  Private
router.get("/summary/:month/:year", auth, getBudgetSummary);

// @route   GET api/budget/comparison
// @desc    Get budget comparison for all months
// @access  Private
router.get("/comparison", auth, getBudgetComparison);

export default router;
