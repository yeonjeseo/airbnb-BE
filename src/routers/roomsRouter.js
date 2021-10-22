import express from "express";
// import reviewsRouter from "./reviewsRouter.js";
import {
  postRooms,
  getOneRoom,
  getRoomsFlexible,
} from "../controller/roomController.js";

import {
  getReviews,
  postReviews,
  patchReviews,
  deleteReviews,
} from "../controller/reviewController.js";

const roomsRouter = express.Router();

roomsRouter.route("/").get(getRoomsFlexible).post(postRooms);

roomsRouter.route("/:roomId").get(getOneRoom);

roomsRouter.route("/:roomId/reviews").get(getReviews).post(postReviews).patch(patchReviews).delete(deleteReviews);


export default roomsRouter;
