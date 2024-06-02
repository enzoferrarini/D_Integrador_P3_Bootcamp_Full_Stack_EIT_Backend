import { Schema, model } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String, unique: true, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    shortDesc: { type: String, required: true },
    longDesc: { type: String, required: false },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    delivery: { type: Boolean, default: false },
    ageFrom: { type: Number, default: 0 },
    ageTo: { type: Number, default: 99 },
    imgUrl: { type: String, default: "" },
    deletedAt: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true }
);

export const Product = model("Product", ProductSchema);
