import { Schema, model } from "mongoose";

const CartSchema = new Schema(
  {
    items: [
      {
        countProduct: {
          type: Number,
          required: true,
        },
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

export const Cart = model("Cart", CartSchema);
