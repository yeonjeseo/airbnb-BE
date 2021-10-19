import mongoose from "mongoose";

const { Schema } = mongoose;

const roomSchema = new Schema({
  title: { type: String },
  host: { type: String },
  description: { type: String },
  category: { type: String }, //멋진 수영장, 농장, 성, 해변근처, 캠핑카
  pricePerDay: { type: Number },
  amountOfBed: { type: Number },
  rating: { type: Number },
  imageUrl: [{ type: String }],
  location: {
    lat: { type: Number },
    lon: { type: Number },
  },
  languages: [{ type: String }], // 한국어 영어 독일어
  rules: [{ type: String }], // 반려동물, 흡연
});

const Room = mongoose.model("Room", roomSchema);
export default Room;
