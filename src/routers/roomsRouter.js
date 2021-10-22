import express from "express";
import {
  postRooms,
  getOneRoom,
  getRoomsFlexible,
} from "../controller/roomController.js";
import {
  postReviews,
  patchReviews,
  deleteReviews,
} from "../controller/reviewController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const roomsRouter = express.Router();

roomsRouter.route("/").get(getRoomsFlexible).post(postRooms);
roomsRouter.route("/:roomId").get(getOneRoom);
// roomsRouter.use("/:roomId/reviews", reviewsRouter);
roomsRouter
  .route("/:roomId/reviews")
  .post(authMiddleware, postReviews)
  .delete(deleteReviews)
  .patch(patchReviews);

export default roomsRouter;
