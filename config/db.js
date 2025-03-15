import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    console.log(' process.env.MONGO_URI', process.env.MONGO_URI);
    await mongoose.connect(
      process.env.MONGO_URI ||
        'mongodb+srv://light:light@cluster0.drlit.mongodb.net/test-data-for-seed?retryWrites=true&w=majority'
    );

    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);

    process.exit(1);
  }
};

export default connectDB;
