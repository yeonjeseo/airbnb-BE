import mongoose from "mongoose";

const { Schema } = mongoose;

const roomSchema = new Schema({
  title: { type: String },
  // desciption: { type: String },
  // roomType: { type: String },
});

const Room = mongoose.model("Room", roomSchema);

export default Room;
