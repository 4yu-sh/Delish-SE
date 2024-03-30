import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User ",
    },
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    Comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User ",
    },
    name: { type: String, required: true },
    imageSrc: { type: String, required: true },
    imageAlt: { type: String, required: true },
    seller: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    freshness: { type: Number, required: true },
    location: {
      type: String,
      required: true,
    },
    reviews: [reviewSchema],
    dateHarvested: {
      type: Date,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
