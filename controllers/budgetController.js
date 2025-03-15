import Budget from '../models/Budget.js';
import Wishlist from '../models/Wishlist.js';

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

export const createOrUpdateBudget = async (req, res) => {
  try {
    console.log(req.body);
    const { month, year, amount } = req.body;

    let budget = await Budget.findOne({
      user: req.user.id,
      month,
      year: parseInt(year),
    });

    if (budget) {
      budget.amount = amount;
    } else {
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

export const getBudgetSummary = async (req, res) => {
  try {
    const { month, year } = req.params;
    const numericYear = parseInt(year);

    const budget = await Budget.findOne({
      user: req.user.id,
      month,
      year: numericYear,
    });

    if (!budget) {
      return res.status(404).json({ msg: 'Budget not found' });
    }

    const wishlist = await Wishlist.findOne({
      user: req.user.id,
      month,
      year: numericYear,
    });

    let totalWishlistAmount = 0;
    let totalPurchasedAmount = 0;
    let remainingItems = 0;

    if (wishlist) {
      totalWishlistAmount = wishlist.items.reduce(
        (sum, item) => sum + item.price,
        0
      );

      totalPurchasedAmount = wishlist.items
        .filter((item) => item.purchased)
        .reduce((sum, item) => sum + item.price, 0);

      remainingItems = wishlist.items.filter((item) => !item.purchased).length;
    }

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

export const getBudgetComparison = async (req, res) => {
  try {
    const budgets = await Budget.find({ user: req.user.id }).sort({
      year: 1,
      month: 1,
    });

    const wishlists = await Wishlist.find({ user: req.user.id });

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
