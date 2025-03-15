import mongoose from 'mongoose';
import Product from './models/Product.js'; // Adjust the path as needed
import connectDB from './config/db.js';

await connectDB();

// Sample Grocery Products
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

// Function to generate store data
const getRandomPrices = () => {
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

// Populate the products with store data
const seedData = products.map((product) => ({
  ...product,
  prices: getRandomPrices(),
}));

// Function to insert products into MongoDB
export const seedProducts = async () => {
  try {
    await Product.deleteMany({}); // Clear existing data
    await Product.insertMany(seedData);
    console.log('✅ Seed data inserted successfully!');
  } catch (error) {
    console.error('❌ Error inserting seed data:', error);
  }
};

// Run the seeder
seedProducts();
