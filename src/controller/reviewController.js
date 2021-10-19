import Review from "../models/Review.js";
import mongoose from "mongoose";

// import { authMiddleware} from "../middlwares/Authentication";
//get, post, patch, delete + Review 고치기
// 변수명 전체 변경 예정

export const getReview = async (req, res) => {
  const { homeId, reviewId } = req.params;
  try {
    const review = await Comment.find({ homId: postId }).sort("-_id");
    res.status(200).send({ comment: comment });
  } catch (err) {
    res.status(400).send({ err: "코맨트 에러" });
  }
};

// postingID => 변경
export const postReviews = async (req, res) => {
  const { postingId } = req.params;
  try {
    await Comment.find({ postingID: postingId });
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
};

export const patchReviews = async (req, res) => {
  const { postingId } = req.params;
  const { text } = req.body;
  try {
    await Comment.findOneAndUpdate(
      { postingID: postingId, authorID: userobjectId },
      { text }
    );
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
};

export const deleteReviews = async (req, res) => {
  const { postingId } = req.params;
  try {
    await Comment.findOneAndRemove({
      postingID: postingId,
      authorID: userobjectId,
    });
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
};

//아래 rating 다시
