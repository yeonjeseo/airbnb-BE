import express from "express";


import {
  getReviews,
  postReviews,
  patchReviews,
  deleteReviews,
} from "../controller/reviewController.js";

//여기에 미들웨어

const reviewsRouter = express.Router();

reviewsRouter.route("/:roomId").get(getReviews).post(postReviews);

reviewsRouter.route("/:roomId").patch(patchReviews);

reviewsRouter.route("/:roomId").delete(deleteReviews);

export default reviewsRouter;
