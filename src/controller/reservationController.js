import Reseravation from "../models/Reservation.js";

const userId = "여행가고싶습니다.";

export const postReservation = async (req, res) => {
  const {
    body: { roomId, start, end, amountOfGuests },
    // user: { userId },
  } = req;
  /* Reservation을 조회해서 마찬가지로 $gt $lt 써서 예약이 없을 경우 length === 0 일때 예약 생성 필요 */
  const reservation = {
    roomId,
    bookerId: userId,
    amountOfGuests,
    start,
    end,
  };

  try {
    await Reseravation.create(reservation);
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ result: "failure" });
  }
};
