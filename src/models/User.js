import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    // required: true,
  },
  phoneNo: {
    type: String,
    // required: true,
  },
  birthDt: {
    type: String,
    default: Date.now(),
    // required: true,
  },
  pinNum: {
    type: Number,
    // required: true,
  },
});

userSchema.set("toJSON", {
  virtuals: true,
});

const User = mongoose.model("User", userSchema);

export default User;
