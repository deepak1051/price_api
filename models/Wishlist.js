import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
      },
      store: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      purchased: {
        type: Boolean,
        default: false,
      },
      purchaseDate: {
        type: Date,
      },
      addedDate: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

const Wishlist = mongoose.model('wishlist', wishlistSchema);

export default Wishlist;
