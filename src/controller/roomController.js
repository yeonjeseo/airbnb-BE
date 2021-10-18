import Room from "../models/Room.js";
import Review from "../models/Review.js";
import Reseravation from "../models/Reservation.js";

export const getRooms = async (req, res) => {
  const { checkIn, checkOut } = req.query;

  //쿼리가 없을 경우 - 전체 조회
  if (
    checkIn === undefined ||
    checkOut === undefined ||
    checkIn === "" ||
    checkOut === ""
  ) {
    const rooms = await Room.find({});
    return res.status(200).send(rooms);
  }

  const roomsNotAvailable = await Reseravation.find({
    $and: [{ start: { $lt: checkOut } }, { end: { $gt: checkIn } }],
  });

  // $nin 쿼리로 NotAvailable에 있는 것을 제외하고 조회
  // const rooms = await Room.find({})
  console.log(roomsNotAvailable);

  return res.status(200).send({ result: "쿼리로 받을 때" });
};

// CREATE Room : Dummy data
export const postRooms = async (req, res) => {
  const {
    title,
    host,
    description,
    roomType,
    pricePerDay,
    amountOfBed,
    rating,
    imageUrl,
    location,
    // reservation,
  } = req.body;

  const newRoom = {
    title,
    host,
    description,
    roomType,
    pricePerDay,
    amountOfBed,
    rating,
    imageUrl,
    location,
    // reservation,
  };

  await Room.create(newRoom);

  return res.status(200).send(newRoom);
};

// 방 1개와 그 댓글들 조회
export const getOneRoom = async (req, res) => {
  const { roomId } = req.params;

  const room = await Room.findById(roomId);
  const reviews = await Review.find({ homeId: roomId });

  return res.status(200).send({ result: ":roomId로 받을 때", room, reviews });
};

export const getRoomsByFilter = async (req, res) => {
  const filter = req.query;

  // const rooms = await Room.find({
  //   filter: {
  //     $in: [filter],
  //   },
  // });
  return res.status(200).send();
};

export const getRoomsByLocation = (req, res) => {
  return res.status(200).send();
};
