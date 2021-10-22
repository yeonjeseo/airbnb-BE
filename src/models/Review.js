import mongoose from "mongoose";
// const reviewSchema = new mongoose.Schema({
const { Schema } = mongoose;

const reviewSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  roomId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
  },
  createdAt: {
    type: String,
    required: true,
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
