// seed.js

import connectDB from "./config/db.js";
import generateMockData from "./mock-data.js";
// Connect to database and seed data
const seedData = async () => {
  try {
    await connectDB();
    const result = await generateMockData();

    console.log("\n===== DATABASE SEEDING COMPLETE =====");
    console.log(`Created ${result.productCount} products`);
    console.log("\nDummy account created:");
    console.log(`Email: ${result.dummyUser.email}`);
    console.log(`Password: ${result.dummyUser.password}`);
    console.log("\nThis account has data for 12 months with 20 products.");

    process.exit(0);
  } catch (err) {
    console.error("Error seeding database:", err);
    process.exit(1);
  }
};

seedData();
