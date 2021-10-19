import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
    fullname : {
        type: String,
        // required: true,
    },
    email : {
        type: String,
        // required: true,
    },
    phoneNum : {
        type: String,
        required: true,
    },
    birthDt : {
        type: String,
        // default: Date.now(),
        //생일 값이 안들어오면 오늘로 지정됨, default를 제외, 생일 입력 필드도 필수 입력-프런트랑 이야기하기
        // required: true,
        //이게 되는지 확인
    },
    pinNum : {
      type: String,
      required: true,

  },
})


// userSchema.set('toJSON', {
//     virtuals: true,
// })

const User = mongoose.model("User", userSchema);

export default User;
