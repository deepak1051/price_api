// utils/mockDataGenerator.js
// const Product = require("../models/Product");
// const User = require("../models/User");
// const Wishlist = require("../models/Wishlist");
// const Budget = require("../models/Budget");
// const bcrypt = require("bcryptjs");

import Product from './models/Product.js';
import User from './models/User.js';
import Wishlist from './models/Wishlist.js';
import Budget from './models/Budget.js';
import bcrypt from 'bcryptjs';
// import { seedProducts } from './product-seed.js';

const products = [
  {
    name: 'Wheat Flour',
    description: 'High-quality whole wheat flour.',
    category: 'Grains',
    image: 'https://images.pexels.com/photos/678414/pexels-photo-678414.jpeg',
  },
  {
    name: 'Basmati Rice',
    description: 'Premium long-grain basmati rice.',
    category: 'Grains',
    image: 'https://images.pexels.com/photos/4110251/pexels-photo-4110251.jpeg',
  },
  {
    name: 'Olive Oil',
    description: 'Extra virgin olive oil for cooking.',
    category: 'Cooking Oil',
    image: 'https://images.pexels.com/photos/208516/pexels-photo-208516.jpeg',
  },
  {
    name: 'Brown Bread',
    description: 'Whole grain brown bread.',
    category: 'Bakery',
    image:
      'https://images.pexels.com/photos/2434/bread-food-healthy-breakfast.jpg',
  },
  {
    name: 'Peanut Butter',
    description: 'Creamy peanut butter with no added sugar.',
    category: 'Pantry',
    image: 'https://images.pexels.com/photos/132694/pexels-photo-132694.jpeg',
  },
  {
    name: 'Almond Milk',
    description: 'Dairy-free almond milk, unsweetened.',
    category: 'Dairy',
    image: 'https://images.pexels.com/photos/594590/pexels-photo-594590.jpeg',
  },
  {
    name: 'Organic Eggs',
    description: 'Farm fresh organic eggs.',
    category: 'Dairy',
    image: 'https://images.pexels.com/photos/573288/pexels-photo-573288.jpeg',
  },
  {
    name: 'Cashews',
    description: 'Roasted cashews, lightly salted.',
    category: 'Dry Fruits',
    image: 'https://images.pexels.com/photos/4110251/pexels-photo-4110251.jpeg',
  },
  {
    name: 'Honey',
    description: 'Pure organic honey.',
    category: 'Pantry',
    image: 'https://images.pexels.com/photos/129115/pexels-photo-129115.jpeg',
  },
  {
    name: 'Green Tea',
    description: 'Premium green tea leaves.',
    category: 'Beverages',
    image: 'https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg',
  },
  {
    name: 'Coconut Water',
    description: 'Fresh coconut water with no additives.',
    category: 'Beverages',
    image: 'https://images.pexels.com/photos/221080/pexels-photo-221080.jpeg',
  },
  {
    name: 'Fresh Bananas',
    description: 'Sweet and organic bananas.',
    category: 'Fruits',
    image: 'https://images.pexels.com/photos/594590/pexels-photo-594590.jpeg',
  },
  {
    name: 'Fresh Apples',
    description: 'Crisp and juicy apples.',
    category: 'Fruits',
    image: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg',
  },
  {
    name: 'Fresh Strawberries',
    description: 'Sweet and organic strawberries.',
    category: 'Fruits',
    image: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg',
  },
  {
    name: 'Tomatoes',
    description: 'Fresh and juicy red tomatoes.',
    category: 'Vegetables',
    image: 'https://images.pexels.com/photos/594590/pexels-photo-594590.jpeg',
  },
  {
    name: 'Carrots',
    description: 'Crunchy organic carrots.',
    category: 'Vegetables',
    image: 'https://images.pexels.com/photos/4110251/pexels-photo-4110251.jpeg',
  },
  {
    name: 'Spinach',
    description: 'Fresh green spinach leaves.',
    category: 'Vegetables',
    image: 'https://images.pexels.com/photos/4110251/pexels-photo-4110251.jpeg',
  },
  {
    name: 'Chia Seeds',
    description: 'Organic chia seeds for a healthy diet.',
    category: 'Health',
    image: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg',
  },
  {
    name: 'Oats',
    description: 'Gluten-free rolled oats.',
    category: 'Health',
    image: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg',
  },
  {
    name: 'Soy Milk',
    description: 'Lactose-free soy milk.',
    category: 'Dairy',
    image: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg',
  },
];

const getRandomPricesForProduct = () => {
  return [
    {
      store: 'Amazon',
      price: (Math.random() * 10 + 5).toFixed(2),
      currency: 'USD',
      url: 'https://www.amazon.com/product',
      date: new Date(),
    },
    {
      store: 'Walmart',
      price: (Math.random() * 10 + 5).toFixed(2),
      currency: 'USD',
      url: 'https://www.walmart.com/product',
      date: new Date(),
    },
    {
      store: 'Big Basket',
      price: (Math.random() * 10 + 5).toFixed(2),
      currency: 'USD',
      url: 'https://www.bigbasket.com/product',
      date: new Date(),
    },
    {
      store: 'Blinkit',
      price: (Math.random() * 10 + 5).toFixed(2),
      currency: 'USD',
      url: 'https://www.blinkit.com/product',
      date: new Date(),
    },
  ];
};

const seedData = products.map((product) => ({
  ...product,
  prices: getRandomPricesForProduct(),
}));

// Store names
const stores = ['Walmart', 'Amazon', 'Target', 'Costco'];

// Month names
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

// Generate random price between min and max

// Generate random variation of price

const getRandomPrice = (min, max) => {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
};

// Generate mock data
const generateMockData = async () => {
  try {
    const currentDate = new Date();

    // Clear existing data
    await Product.deleteMany({});
    await Wishlist.deleteMany({});
    await Budget.deleteMany({});

    await Product.insertMany(seedData);

    // Generate products with price history
    // const products = [];

    // for (const product of groceryProducts) {
    //   // Base prices for each store
    //   const basePrices = {};
    //   stores.forEach((store) => {
    //     basePrices[store] = getRandomPrice(1, 15);
    //   });

    //   // Generate price history for last 12 months
    //   const prices = [];

    //   console.log("current Date", currentDate);

    //   for (let i = 0; i < 12; i++) {
    //     const monthDate = new Date(currentDate);
    //     monthDate.setMonth(currentDate.getMonth() - i);

    //     stores.forEach((store) => {
    //       const basePrice = basePrices[store];
    //       const price = getVariation(basePrice);

    //       prices.push({
    //         store,
    //         price,
    //         currency: "USD",
    //         url: `https://${store.toLowerCase()}.com/products/${product.name
    //           .toLowerCase()
    //           .replace(/\s+/g, "-")}`,
    //         date: monthDate,
    //       });
    //     });
    //   }

    //   const newProduct = new Product({
    //     ...product,
    //     prices,
    //   });

    //   await newProduct.save();
    //   products.push(newProduct);
    // }

    console.log(`${products.length} products created`);

    // Create dummy user account
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    let dummyUser = await User.findOne({ email: 'dummy@example.com' });

    if (!dummyUser) {
      dummyUser = new User({
        name: 'Dummy User',
        email: 'dummy@example.com',
        password: hashedPassword,
      });

      await dummyUser.save();
      console.log('Dummy user created');
    }

    // Create budgets for the last 12 months
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    for (let i = 0; i < 12; i++) {
      const monthIndex = (currentMonth - i + 12) % 12;
      const yearOffset = Math.floor((currentMonth - i) / 12);
      const year = currentYear + yearOffset;
      const month = months[monthIndex];

      // Generate random budget between $150 and $300
      const budgetAmount = getRandomPrice(150, 300);

      const budget = new Budget({
        user: dummyUser._id,
        month,
        year,
        amount: budgetAmount,
      });

      await budget.save();
    }

    console.log('12 monthly budgets created');

    // Create wishlists for the last 12 months with random items
    for (let i = 0; i < 12; i++) {
      const monthIndex = (currentMonth - i + 12) % 12;
      const yearOffset = Math.floor((currentMonth - i) / 12);
      const year = currentYear + yearOffset;
      const month = months[monthIndex];

      // Create wishlist
      const wishlist = new Wishlist({
        user: dummyUser._id,
        month,
        year,
        items: [],
      });

      // Add 10-15 random products to wishlist

      let products = await Product.find({});

      const numItems = Math.floor(Math.random() * 6) + 10; // 10 to 15 items
      const shuffledProducts = [...products].sort(() => 0.5 - Math.random());
      const selectedProducts = shuffledProducts.slice(0, numItems);

      console.log('selectedProducts', selectedProducts);

      for (const product of selectedProducts) {
        // Select random store and its most recent price for this month
        const randomStoreIndex = Math.floor(Math.random() * stores.length);
        const store = stores[randomStoreIndex];

        // Find price for this product, store and month
        const monthDate = new Date(year, monthIndex);
        const priceObj =
          product.prices.find(
            (p) =>
              p.store === store &&
              new Date(p.date).getMonth() === monthDate.getMonth() &&
              new Date(p.date).getFullYear() === monthDate.getFullYear()
          ) || product.prices.find((p) => p.store === store); // Fallback to any price from this store

        const price = priceObj ? priceObj.price : getRandomPrice(1, 15);

        // Random purchased status (weighted towards false for recent months)
        const ageInMonths = i;
        const purchaseProbability = Math.min(0.8, ageInMonths / 10);
        const purchased = Math.random() < purchaseProbability;

        wishlist.items.push({
          product: product._id,
          store,
          price,
          purchased,
          purchaseDate: purchased
            ? new Date(year, monthIndex, Math.floor(Math.random() * 28) + 1)
            : null,
          addedDate: new Date(
            year,
            monthIndex,
            Math.floor(Math.random() * 28) + 1
          ),
        });
      }

      await wishlist.save();
    }

    console.log('12 monthly wishlists created with random items');

    console.log('Mock data generation complete!');

    return {
      productCount: products.length,
      dummyUser: {
        email: dummyUser.email,
        password: 'password123',
      },
    };
  } catch (err) {
    console.error('Error generating mock data:', err);
    throw err;
  }
};

export default generateMockData;
