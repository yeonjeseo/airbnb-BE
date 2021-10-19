import express from "express";
import { postReservation } from "../controller/reservationController.js";
const reservationRouter = express.Router();

reservationRouter.route("/").post(postReservation);

export default reservationRouter;
