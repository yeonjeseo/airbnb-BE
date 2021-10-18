import Room from "../models/Room.js";
import Reseravation from "../models/Reservation.js";

export const getRooms = async (req, res) => {
  const { checkIn, checkOut } = req.query;

  //쿼리가 없을 경우 - 전체 조회
  if (
    checkIn === undefined ||
    checkOut === undefined ||
    checkIn === "" ||
    checkout === ""
  ) {
    const rooms = await Room.find({});
    return res.status(200).send(rooms);
  }

  const roomsAvailable = await Reseravation.find({
    $and: [{ start: { $gt: checkOut } }, { end: { $lt: checkIn } }],
  });

  console.log(roomsAvailable);

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
    reservation,
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
    location,
    reservation,
  };

  await Room.create(newRoom);

  return res.status(200).send(newRoom);
};

export const getOneRoom = (req, res) => {
  console.log(req.params);

  return res.status(200).send({ result: ":roomId로 받을 때" });
};

export const getRoomsByLocation = (req, res) => {
  return res.status(200).send();
};

export const getRoomsByFilter = (req, res) => {
  return res.status(200).send();
};
