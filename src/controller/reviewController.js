import Review from "../models/Review.js";
import mongoose from "mongoose";
import Room from "../models/Room.js";

// import { authMiddleware} from "../middlwares/Authentication";
//get, post, patch, delete + Review 고치기
// 변수명 전체 변경 예정

export const getReviews = async (req, res) => {
  const { homeId, reviewId } = req.params;

  try {
    const review = await Review.find({ upperPost: roomId }).sort("-_id");
    res.status(200).send({ review: review });
  } catch (err) {
    res.status(400).send({ err: "리뷰 에러" });
  }
};

// postingID => 변경
export const postReviews = async (req, res) => {
  const { roomId } = req.params;
  const { userId, review } = req.body;

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dateString = [year, month, day].join("-");

  try {
    await Review.create({
      userId: userId,
      review: review,
      upperPost: roomId,
      createdAt: dateString,
      rating: rating,
    });

    const reviews = await Review.find({ roomId });
    let sum = 0;
    reviews.forEach((review) => {
      sum += review.rating;
    });
    const avg = sum / reviews.length;
    await Room.findByIdAndUpdate(roomId, { $set: { rating: avg } });
    res.status(200).send({ result: "success" });
  } catch (err) {
    console.log(err);
    res.status(400).send({ err: "err" });
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
