import User from "../models/User.js";
import bcrypt from "bcrypt";
import { jwtToken } from "jsonwebtoken"; 
import { Content } from "../models/Room.js";
import { authMiddleware} from "../middlwares/Authentication.js";

export const signup = async (req, res) => {
  const { name, email, phoneNo, birthDt, pinNum } = req.body;

  const re_phoneNo = /^01(?:0|1|[6-9])[.-]?(\\d{3}|\\d{4})[.-]?(\\d{4})$/
  const re_pinNum = /^[0-9-]{6}$/
  const re_email = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
  const re_birthDt = /^[0-9-]{6-8}$/

  if (phoneNo.search(re_phoneNo) == -1) {
      return res.status(400).send({
          errorMessage: '휴대폰번호의 형식이 일치하지 않습니다.',
      })
  } else if (pinNum.search(re_pinNum) == -1) {
      return res.status(401).send({
          errorMessage: '핀넘버의 형식이 일치하지 않습니다.',
      })
  } else if (email.search(re_email) == -1) {
    return res.status(402).send({
        errorMessage: '이메일의 형식이 일치하지 않습니다.',
    })
  } else if (email.search(re_birthDt) == -1) {
    return res.status(403).send({
        errorMessage: '생년월일의 형식이 일치하지 않습니다.',
    })
  }
   try {
    console.log(name, email);//
    const isExisting = await User.find({ $or: [{ name }, { email }] }); //둘중 하나가 User 몽고DB에 존재하는지 여부 확인
    if (isExisting.length) //둘중 하나라도 존재하면 1이상의 값이 나오므로 true로 처리해서 아래 값을 return
      return res.status(402).send({
        result: "failure",
        msg: "이미 가입한 이름 또는 이메일이 있습니다.",
      });

    const hashedPassword = await bcrypt.hash(pinNum, 5);
    
    const string_birthDt = String(birthDt); //스트링 값으로 변환

    const newUser = {
      name,
      email,
      phoneNo,
      string_birthDt,
      pinNum: hashedPassword,
    };

    await User.create(newUser);

    return res
      .status(200)
      .send({ result: "success", msg: "회원가입에 성공하였습니다." });
  } catch (error) {
    return res
      .status(404)
      .send({ result: "failure", msg: "DB 정보 조회 실패" });
  }
};

//휴대폰 번호 로그인
export const auth = async (req, res) => {
  const { phoneNo, pinNum } = req.body;

  const user = await User.findOne({ phoneNo });
  if (!user)
    return res
      .status(400)
      .send({ result: "falure", msg: "존재하지 않는 휴대폰 번호입니다. 회원가입 화면으로 이동합니다" });
      //여기 회원가입으로 보내기

  const isPwMatched = await bcrypt.compare(pinNum, user.pinNum);

  if (!isPwMatched)
    return res
      .status(400)
      .send({ result: "failure", msg: "아이디 혹은 비밀번호가 틀립니다." });
  const { _id } = user; 
  const token = jwtToken(_id);
  return res.status(200).send({ result: "success", msg: "로그인 완료", token });

};
//1.폰넘버로 유저 조회 api 필요 있는지 없는지 보내줘야 함. 회원가입창 or 로그인창
// 존재하면 pinNum 입력란 등장
//2.처음부터 나눠짐,,,, 변수를 이메일을 받았는데 ??
// 

//이메일 로그인
//userrouter에서 auth로 보내준것
//2. 이래도 되나???????????????????????????????????
export const auth_email = async (req, res) => {
  const { email, pinNum } = req.body;

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
  const token = jwtToken(_id);
  return res.status(200).send({ result: "success", msg: "로그인 완료", token });

};


//3. 이건 authMiddleware 어디에
export const getMe = async (req, res) => {
  const { name, email, _id } = req.user;
  console.log(req.user);

  return res.status(200).send({
    name,
    email,
    _id,
  });
};

export const getUserProfile = async (req, res) => {
  const { name } = req.params;
  try {
    const userContents = await Content.find({ authorID: name });
    res.status(200).json({ userContents });
  } catch (error) {
    logger.error(error), res.sendStatus(400);
  }
};
