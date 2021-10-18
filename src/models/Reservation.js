import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
  roomId: { type: mongoose.Types.ObjectId },
  bookerId: { type: mongoose.Types.ObjectId },
  amountOfGuest: { type: Number },
  start: { type: String },
  end: { type: String },
});

const Reseravation = mongoose.model("Reservation", reservationSchema);

export default Reseravation;
