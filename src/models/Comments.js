import { Schema, model } from "mongoose";

const CommentsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  mail: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
});

export const Comment = model("Comment", CommentsSchema);
