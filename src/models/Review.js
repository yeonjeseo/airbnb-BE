import mongoose from "mongoose";

// const reviewSchema = new mongoose.Schema({

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

const Review = mongoose.model("Review", reviewSchema);

export default Review;

//     title: { type: String, required: true },
//     content: { type: String, required: true },
//     helpfulVotes: { type: Number },
//     dateLeft: { type: Date },
//     _guest: { type: Schema.Types.ObjectId, ref: 'User' },
//     _listing: { type: Schema.Types.ObjectId, ref: 'Listing' },
