import express from "express";

const userRouter = express.Router();

userRouter.post("/");
userRouter.post("/login");

// 페이지 별로 로그인 검사를 위해 별도 API 준비
userRouter.get("/auth");
export default userRouter;
