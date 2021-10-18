import express from "express";
import reviewsRouter from "./reviewsRouter.js";
import { getRooms } from "../controller/roomController.js";

const roomsRouter = express.Router();

roomsRouter.route("/").get(getRooms);

roomsRouter.route("/:roomId");

roomsRouter.use("/:roomId/reviews", reviewsRouter);

export default roomsRouter;
