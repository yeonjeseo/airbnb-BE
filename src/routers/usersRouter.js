import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import  jwtToken  from "jsonwebtoken"; 
// import { boolean } from "yargs";
// import { Content } from "../models/Room.js";
// import { authMiddleware} from "../middlwares/Authentication.js";
// const { sign, verify } = jwt;
// const token = sign({"d":"dd"}, "secret", {expiresIn: 300})
// console.log(token);
// const verifycode = verify(token, "secret");
// console.log(verifycode);


const userRouter = express.Router();

userRouter.post("/");
userRouter.post("/login");

//검완
userRouter.post("/signup", async (req, res) => {
  const { fullname, email, phoneNum, birthDt, pinNum } = req.body;

  const re_phoneNum = /^[0-9-]{11}$/
  const re_pinNum = /^[0-9-]{6}$/
  const re_email = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
  const re_birthDt = /^[0-9-]{6,8}$/

  if (phoneNo.search(re_phoneNum) == -1) {
      return res.status(400).send({
          errorMessage: '휴대폰번호의 형식이 일치하지 않습니다.',
      })
  } else if (pinNo.search(re_pinNum) == -1) {
      return res.status(401).send({
          errorMessage: '핀넘버의 형식이 일치하지 않습니다.',
      })
  } else if (email.search(re_email) == -1) {
    return res.status(402).send({
        errorMessage: '이메일의 형식이 일치하지 않습니다.',
    })
  } else if (birthDt.search(re_birthDt) == -1) {
    return res.status(403).send({
        errorMessage: '생년월일의 형식이 일치하지 않습니다.',
    })
  }
   try {
    console.log(fullname, email);
    const isExisting = await User.find({ $or: [{ fullname }, { email }] }); //둘중 하나가 User 몽고DB에 존재하는지 여부 확인
    if (isExisting.length) //둘중 하나라도 존재하면 1이상의 값이 나오므로 true로 처리해서 아래 값을 return
      return res.status(404).send({
        result: "failure",
        msg: "이미 가입한 이름 또는 이메일이 있습니다.",
      });

    const hashedPassword = await bcrypt.hash(pinNum, 5);
    
    // const string_birthDt = String(birthDt); //스트링 값으로 변환, 이미ㅣ db에는 스트링으로 저장됨

    const newUser = {
      fullname,
      email,
      phoneNum,
      birthDt, 
      pinNum: hashedPassword,
    };
    console.log(newUser);
    // await User.save(newUser); //create에서 변경
    await User.create(newUser);
    
    return res
      .status(200)
      .send({ result: "success", msg: "회원가입에 성공하였습니다." });
  } catch (error) {
    console.log(error);
    return res
      .status(405)
      .send({ result: "failure", msg: "DB 정보 조회 실패" });
  }
});


//원래는 route("/").post(포스트이름)

// 페이지 별로 로그인 검사를 위해 별도 API 준비

userRouter.get("/auth" , async (req, res) => {
  const { phoneNum, pinNum } = req.body; //

  // if (!user)
  //   return res
  //     .status(406)
  //     .send({ result: "failure", msg: "존재하지 않는 휴대폰 번호입니다. 회원가입 화면으로 이동합니다" });

  const isPwMatched = await bcrypt.compare(pinNum, user.pinNum);

  if (!isPwMatched)
    return res
      .status(407)
      .send({ result: "failure", msg: "아이디 혹은 비밀번호가 틀립니다." });
  const { _id } = user; 
  const token = jwtToken.sign({ fullname: user.fullname }, 'airbnb-secret-key');
  return res.status(200).send({ result: "success", msg: "로그인 완료", token });

});


//검완
userRouter.get("/auth_email", async (req, res) => {
  const { email, pinNum } = req.body;
try{
  const user = await User.findOne({ email });
  if (!user)
    return res
      .status(400)
      .send({ result: "falure", msg: "이메일 혹은 비밀번호가 틀립니다" });

  const isPwMatched = await bcrypt.compare(pinNum, user.pinNum);

  if (!isPwMatched)
    return res
      .status(400)
      .send({ result: "failure", msg: "아이디 혹은 비밀번호가 틀립니다." });
  const { _id } = user; 
  // const token = jwtToken(_id);    
  const token = jwtToken.sign({ fullname: user.fullname }, 'airbnb-secret-key')
  return res.status(200).send({ result: "success", msg: "로그인 완료", token });
} catch (error) {
  console.log(error);
  return res
    .status(405)
    .send({ result: "failure", msg: "DB 정보 조회 실패" });
}});


//검완
userRouter.get("/exist_user", async (req, res) =>{
  const {phoneNo} = req.body;
  const user = await User.findOne({ phoneNo }); 
  if (!user)
    return res
    .status(406)
    .send( {result: "failure"})
  
  return res.status(200).send({ result: "success"});

  });



export default userRouter;
//콜백