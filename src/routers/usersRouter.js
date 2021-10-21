import express from "express";

// import User from "../models/User.js";
// import bcrypt from "bcrypt";
// import  jwtToken  from "jsonwebtoken";
// import { boolean } from "yargs";
// import { Content } from "../models/Room.js";
// import { authMiddleware} from "../middlwares/Authentication.js";
// const { sign, verify } = jwt;
// const token = sign({"d":"dd"}, "secret", {expiresIn: 300})
// console.log(token);
// const verifycode = verify(token, "secret");
// console.log(verifycode);
import {
  signup,
  auth_phone,
  auth_email,
  exist_phone,
  exist_email,
} from "../controller/userController.js";
const usersRouter = express.Router();

usersRouter.route("/signup").post(signup);
usersRouter.route("/auth_phone").post(auth_phone);
usersRouter.route("/auth_email").post(auth_email);
usersRouter.route("/exist_phone").post(exist_phone);
usersRouter.route("/exist_email").post(exist_email);

export default usersRouter;

// userRouter.post("/");
// userRouter.post("/login");

//회원가입
// userRouter.post("/signup", async (req, res) => {
//   const { fullname, email, phoneNum, birthDt, pinNum } = req.body;

//   const re_phoneNum = /^[0-9-]{11}$/
//   const re_pinNum = /^[0-9-]{6}$/
//   const re_email = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
//   const re_birthDt = /^[0-9-]{6,8}$/

//   if (phoneNum.search(re_phoneNum) == -1) {
//       return res.status(400).send({
//           errorMessage: '휴대폰번호의 형식이 일치하지 않습니다.',
//       })
//   } else if (pinNum.search(re_pinNum) == -1) {
//       return res.status(401).send({
//           errorMessage: '핀넘버의 형식이 일치하지 않습니다.',
//       })
//   } else if (email.search(re_email) == -1) {
//     return res.status(402).send({
//         errorMessage: '이메일의 형식이 일치하지 않습니다.',
//     })
//   } else if (birthDt.search(re_birthDt) == -1) {
//     return res.status(403).send({
//         errorMessage: '생년월일의 형식이 일치하지 않습니다.',
//     })
//   }
//    try {
//     console.log(email);
//     const isExisting = await User.find({ email } ); //둘중 하나가 User 몽고DB에 존재하는지 여부 확인
//     if (isExisting.length) //둘중 하나라도 존재하면 1이상의 값이 나오므로 true로 처리해서 아래 값을 return
//       return res.status(404).send({
//         result: "failure",
//         msg: "이미 가입한 이름 또는 이메일이 있습니다.",
//       });

//     const hashedPassword = await bcrypt.hash(pinNum, 5);

//     // const string_birthDt = String(birthDt); //스트링 값으로 변환, 이미ㅣ db에는 스트링으로 저장됨

//     const newUser = {
//       fullname,
//       email,
//       phoneNum,
//       birthDt,
//       pinNum: hashedPassword,
//     };
//     // await User.save(newUser); //create에서 변경
//     await User.create(newUser);
//     console.log(newUser);
//     return res
//       .status(200)
//       .send({ result: "success", msg: "회원가입에 성공하였습니다." });
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(405)
//       .send({ result: "failure", msg: "DB 정보 조회 실패" });
//   }
// });

//핸드폰로그인
// userRouter.get("/auth_phone", async (req, res) => {
//   const { phoneNum, pinNum } = req.body;
// try{
//   const user = await User.findOne({ phoneNum });
//   const isPwMatched = await bcrypt.compare(pinNum, user.pinNum);

//   if (!isPwMatched)
//     return res
//       .status(400)
//       .send({ result: "failure", msg: "비밀번호가 틀립니다." });
//   const { _id } = user;
//   const token = jwtToken.sign({ fullname: user.fullname }, 'airbnb-secret-key')
//   return res.status(200).send({ result: "success", msg: "로그인 완료", token });
// } catch (error) {
//   console.log(error);
//   return res
//     .status(405)
//     .send({ result: "failure", msg: "DB 정보 조회 실패" });
// }});

//이메일로그인
// userRouter.get("/auth_email", async (req, res) => {
//   const { email, pinNum } = req.body;
// try{
//   const user = await User.findOne({ email });
//   const isPwMatched = await bcrypt.compare(pinNum, user.pinNum);

//   if (!isPwMatched)
//     return res
//       .status(400)
//       .send({ result: "failure", msg: "아이디 혹은 비밀번호가 틀립니다." });
//   const { _id } = user;
//   const token = jwtToken.sign({ fullname: user.fullname }, 'airbnb-secret-key')
//   return res.status(200).send({ result: "success", msg: "로그인 완료", token });
// } catch (error) {
//   console.log(error);
//   return res
//     .status(405)
//     .send({ result: "failure", msg: "DB 정보 조회 실패" });
// }});

//휴대폰번호로 회원 조회
// userRouter.get("/exist_phone", async (req, res) =>{
//   const {phoneNum} = req.body;
// try{
//   const user = await User.findOne({ phoneNum });
//   if (!user)
//     return res
//     .status(406)
//     .send( {result: "failure", isExisting : false})

//   return res.status(200).send({ result: "success", isExisting : true});
//   }catch (error) {
//     console.log(error);
//     return res
//       .status(405)
//       .send({ result: "failure", msg: "DB 정보 조회 실패" });
//   }});

// //이메일로 회원 조회
// userRouter.get("/exist_email", async (req, res) =>{
//   const {email} = req.body;
// try{
//   const user = await User.findOne({ email });
//   if (!user)
//     return res
//     .status(406)
//     .send( {result: "failure", isExisting : false})

//   return res.status(200).send({ result: "success", isExisting : true});
// }catch (error) {
//   console.log(error);
//   return res
//     .status(405)
//     .send({ result: "failure", msg: "DB 정보 조회 실패" });
// }});

//콜백
