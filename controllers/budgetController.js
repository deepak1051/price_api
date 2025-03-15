// controllers/budgetController.js
import Budget from '../models/Budget.js';
import Wishlist from '../models/Wishlist.js';

// @route   GET api/budget
// @desc    Get all budgets for a user
// @access  Private
export const getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({ user: req.user.id }).sort({
      year: -1,
      month: -1,
    });

    res.json(budgets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route   GET api/budget/:month/:year
// @desc    Get budget for a specific month and year
// @access  Private
export const getBudgetByMonth = async (req, res) => {
  try {
    const { month, year } = req.params;

    const budget = await Budget.findOne({
      user: req.user.id,
      month,
      year: parseInt(year),
    });

    if (!budget) {
      return res.status(404).json({ msg: 'Budget not found' });
    }

    res.json(budget);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route   POST api/budget
// @desc    Create or update budget
// @access  Private
export const createOrUpdateBudget = async (req, res) => {
  try {
    console.log(req.body);
    const { month, year, amount } = req.body;

    // Check if budget exists
    let budget = await Budget.findOne({
      user: req.user.id,
      month,
      year: parseInt(year),
    });

    if (budget) {
      // Update budget
      budget.amount = amount;
    } else {
      // Create new budget
      budget = new Budget({
        user: req.user.id,
        month,
        year: parseInt(year),
        amount,
      });
    }

    await budget.save();

    res.json(budget);
  } catch (err) {
    console.log(err);
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route   GET api/budget/summary/:month/:year
// @desc    Get budget summary with wishlist totals
// @access  Private
export const getBudgetSummary = async (req, res) => {
  try {
    const { month, year } = req.params;
    const numericYear = parseInt(year);

    // Get budget
    const budget = await Budget.findOne({
      user: req.user.id,
      month,
      year: numericYear,
    });

    if (!budget) {
      return res.status(404).json({ msg: 'Budget not found' });
    }

    // Get wishlist
    const wishlist = await Wishlist.findOne({
      user: req.user.id,
      month,
      year: numericYear,
    });

    // Calculate totals
    let totalWishlistAmount = 0;
    let totalPurchasedAmount = 0;
    let remainingItems = 0;

    if (wishlist) {
      // Calculate total wishlist amount
      totalWishlistAmount = wishlist.items.reduce(
        (sum, item) => sum + item.price,
        0
      );

      // Calculate amount of purchased items
      totalPurchasedAmount = wishlist.items
        .filter((item) => item.purchased)
        .reduce((sum, item) => sum + item.price, 0);

      // Count remaining items
      remainingItems = wishlist.items.filter((item) => !item.purchased).length;
    }

    // Prepare summary
    const summary = {
      budget: budget.amount,
      totalWishlistAmount,
      totalPurchasedAmount,
      remainingBudget: budget.amount - totalPurchasedAmount,
      remainingItems,
      month,
      year: numericYear,
    };

    res.json(summary);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route   GET api/budget/comparison
// @desc    Get budget comparison for all months
// @access  Private
export const getBudgetComparison = async (req, res) => {
  try {
    // Get all budgets
    const budgets = await Budget.find({ user: req.user.id }).sort({
      year: 1,
      month: 1,
    });

    // Get all wishlists
    const wishlists = await Wishlist.find({ user: req.user.id });

    // Prepare comparison data
    const comparison = budgets.map((budget) => {
      const wishlist = wishlists.find(
        (w) => w.month === budget.month && w.year === budget.year
      );

      let totalWishlistAmount = 0;
      let totalPurchasedAmount = 0;

      if (wishlist) {
        totalWishlistAmount = wishlist.items.reduce(
          (sum, item) => sum + item.price,
          0
        );
        totalPurchasedAmount = wishlist.items
          .filter((item) => item.purchased)
          .reduce((sum, item) => sum + item.price, 0);
      }

      return {
        month: budget.month,
        year: budget.year,
        budget: budget.amount,
        totalWishlistAmount,
        totalPurchasedAmount,
        remainingBudget: budget.amount - totalPurchasedAmount,
        utilizationPercentage: (
          (totalPurchasedAmount / budget.amount) *
          100
        ).toFixed(2),
      };
    });

    res.json(comparison);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
