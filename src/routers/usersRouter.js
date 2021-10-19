import express from "express";

const userRouter = express.Router();

userRouter.post("/");
userRouter.post("/login");

//원래는 route("/").post(포스트이름)

// 페이지 별로 로그인 검사를 위해 별도 API 준비
userRouter.get("/auth");
userRouter.get("/auth_email");
export default userRouter;
