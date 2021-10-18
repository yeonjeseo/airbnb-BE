import Room from "../models/Room.js";

export const getRooms = (req, res) => {
  console.log("안녕");
  console.log(req.query);
  return res.status(200).send({ result: "쿼리로 받을 때" });
};

export const postRooms = async (req, res) => {
  const {
    title,
    description,
    roomType,
    price,
    amountOfBed,
    rating,
    imageUrl,
    host,
    location,
  } = req.body;
  const newRoom = {
    title: "신축 투룸",
  };

  await Room.create(newRoom);

  return res.status(200).send(newRoom);
};

export const getOneRoom = (req, res) => {
  console.log(req.params);

  return res.status(200).send({ result: ":roomId로 받을 때" });
};
