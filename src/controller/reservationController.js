import Reseravation from "../models/Reservation.js";

const userId = "여행가고싶습니다.";

export const postReservation = async (req, res) => {
  const {
    body: { roomId, start, end, amountOfGuests },
    // user: { userId },
  } = req;

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
