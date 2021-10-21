import express from "express";
import reviewsRouter from "./reviewsRouter.js";
import {
  postRooms,
  getOneRoom,
  getRoomsFlexible,
} from "../controller/roomController.js";

const roomsRouter = express.Router();

roomsRouter.route("/").get(getRoomsFlexible).post(postRooms);
roomsRouter.route("/:roomId").get(getOneRoom);
// roomsRouter.use("/:roomId/reviews", reviewsRouter);
roomsRouter.route("/:roomId/reviews").get().post().delete().patch();

export default roomsRouter;
