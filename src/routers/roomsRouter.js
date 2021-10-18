import express from "express";
import reviewsRouter from "./reviewsRouter.js";

const roomsRouter = express.Router();

roomsRouter.route("/");

roomsRouter.route("/:roomId");

roomsRouter.use("/:roomId/reviews", reviewsRouter);

export default roomsRouter;
