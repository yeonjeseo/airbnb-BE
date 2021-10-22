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

const roomsRouter = express.Router();

roomsRouter.route("/").get(getRoomsFlexible).post(postRooms);
roomsRouter.route("/:roomId").get(getOneRoom);
// roomsRouter.use("/:roomId/reviews", reviewsRouter);
roomsRouter
  .route("/:roomId/reviews")
  .post(postReviews)
  .delete(deleteReviews)
  .patch(patchReviews);

export default roomsRouter;
