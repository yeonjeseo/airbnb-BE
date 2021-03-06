import Review from "../models/Review.js";
import mongoose from "mongoose";
import Room from "../models/Room.js";
import User from "../models/User.js";

// import { authMiddleware} from "../middlwares/Authentication";
//get, post, patch, delete + Review 고치기
// 변수명 전체 변경 예정

// export const getReviews = async (req, res) => {
//   const { homeId, reviewId } = req.params;

//   try {
//     const review = await Review.find({ upperPost: roomId }).sort("-_id");
//     res.status(200).send({ review: review });
//   } catch (err) {
//     res.status(400).send({ err: "리뷰 에러" });
//   }
// };

// postingID => 변경
export const postReviews = async (req, res) => {
  const { roomId } = req.params;
  const { user } = req;
  console.log(user);
  const { comment, rating } = req.body;

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const createdAt = [year, month, day].join("-");

  try {
    const review = {
      userId: user._id,
      roomId,
      comment,
      rating,
      createdAt,
    };

    await Review.create(review);

    const reviews = await Review.find({ roomId });
    let avg = 0;
    let sum = 0;
    if (reviews.length !== 0) {
      reviews.forEach((review) => {
        sum += review.rating;
      });
      avg = (sum / reviews.length).toFixed(2);
    }

    await Room.findByIdAndUpdate(roomId, { $set: { rating: avg } });
    return res.status(200).send({ result: "success" });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ result: "failure" });
  }
};

export const patchReviews = async (req, res) => {
  const { reviewId } = req.params;
  const { phoneNum, review } = req.body;

  const isReview = await Review.findById(reviewId);
  console.log(isReview);
  if (isReview) {
    if (true) {
      await Review.updateOne(
        { reviewId },
        { $set: { phoneNum: phoneNum, review: review } }
      );
      res.status(200).send({ result: "success" });
    } else {
      res.status(400).send({ result: "err" });
    }
  } else {
    res.status(400).send({ result: "게시글이 존재하지 않음" });
  }
};

export const deleteReviews = async (req, res) => {
  const { reviewId } = req.params;
  const isReview = await Review.findById(reviewId);
  if (isReview) {
    //nickname == ispost["nickname"]
    if (true) {
      await Review.deleteOne({ reviewId });
      res.status(200).send({ result: "success" });
    } else {
      res.status(400).send({ result: "작성자 본인이 아님" });
    }
  } else {
    res.status(400).send({ result: "게시글이 존재하지 않음" });
  }
};

//아래 rating 다시
