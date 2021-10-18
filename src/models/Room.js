import mongoose from "mongoose";

const { Schema } = mongoose;

const roomSchema = new Schema({
  title: { type: String },
  host: { type: String },
  desciption: { type: String },
  roomType: { type: String },
  pricePerDay: { type: Number },
  amountOfBed: { type: Number },
  rating: { type: Number },
  imageUrl: [{ type: String }],
  location: { type: String },
  reservation: { type: String },
});

const Room = mongoose.model("Room", roomSchema);
export default Room;
