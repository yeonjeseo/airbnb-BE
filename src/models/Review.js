import mongoose from "mongoose";

// const reviewSchema = new mongoose.Schema({

const { Schema } = mongoose;

const reviewSchema = new Schema({
  userId: {
    type: String,
  },
  comment: {
    type: String,
    required: true,
  },
  upperPost: {
    type: String,
  },
  createdAt: {
    type: String,
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
