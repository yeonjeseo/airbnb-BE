import Review from "../models/Review.js";

// import { authMiddleware} from "../middlwares/Authentication";
//get, post, patch, delete + Review 고치기
// 변수명 전체 변경 예정

export const getReviews = async (req, res) => {
  const { roomId } = req.params;
  try {
    const review = await Review.find({ upperPost: roomId }).sort("-_id");
    res.status(200).send({ review: review });
  } catch (err) {
    res.status(400).send({ err: "코맨트 에러" });
  }
};

// postingID => 변경
export const postReviews = async (req, res) => {
  const { roomId } = req.params;
  const { phoneNum, review } = req.body;
  let newDate = new Date();
  let date = newDate.toFormat("YYYY-MM-DD HH24:MI:SS");

  try {
    await Review.create({
      phoneNum: phoneNum,
      review: review,
      upperPost: roomId,
      reviewTime: date,
    });
    res.status(200).send({ result: "success" });
  } catch (err) {
    console.log(err);
    res.status(400).send({ err: "err" });
  }
};

export const patchReviews = async (req, res) => {
  const { reviewId } = req.params;
  const { phoneNum, review } = req.body;

  const isreview = await Review.findById(reviewId);
  console.log(isreview);
  if (isreview) {
    if (true) {
      await Review.updateOne(
        { reviewId },
        { $set: { phoneNum: phoneNum, review } }
      );
      res.status(200).send({ result: "success" });
    } else {
      res.status(400).send({ result: "err" });
    }
  } else {
    res.status(400).send({ result: "게시글 존재하지 않음" });
  }
};

export const deleteReviews = async (req, res) => {
  const { reviewId } = req.params;
  const isreview = await Review.findById(reviewId);
  if (isreview) {
    //phoneNum == ispost["phoneNum"]
    if (true) {
      await Review.deleteOne({ reviewId });
      res.status(200).send({ result: "success" });
    } else {
      res.status(400).send({ result: "사용자 본인이 아님" });
    }
  } else {
    res.status(400).send({ result: "게시글 존재하지 않음" });
  }
};

//아래 rating 다시
