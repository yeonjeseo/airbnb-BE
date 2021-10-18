import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
  roomId: { type: mongoose.Types.ObjectId },
  bookerid: { type: mongoose.Types.ObjectId },
  amountOfGuest: { type: Number },
  checkIn: { type: String },
  checkOut: { type: String },
});

const Reseravation = mongoose.model("Reservation", reservationSchema);

export default Reseravation;
