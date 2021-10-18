import mongoose from "mongoose";

const { Schema } = mongoose;

const reviewSchema = new Schema({
  homeId: {
    type: String,
  },
  userId: {
    type: String,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("Review", reviewSchema);
