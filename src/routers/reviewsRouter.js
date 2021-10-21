import express from "express";

import {
  getReviews,
  postReviews,
  patchReviews,
  deleteReviews,
} from "../controller/reviewController.js";

//여기에 미들웨어

const reviewsRouter = express.Router();

reviewsRouter.route("/").get(getReviews).post(postReviews).patch(patchReviews).delete(deleteReviews);

export default reviewsRouter;
