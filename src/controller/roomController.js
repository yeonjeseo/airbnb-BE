import Room from "../models/Room.js";
import Review from "../models/Review.js";
import Reseravation from "../models/Reservation.js";

export const getRoomsFlexible = async (req, res) => {
  const { checkin, checkout, guests, roomType } = req.query;
};

export const getRooms = async (req, res) => {
  const { checkIn, checkOut, guests } = req.query;

  console.log(checkIn, checkOut, guests);
  //쿼리가 없을 경우 - 전체 조회
  if (
    checkIn === undefined ||
    checkOut === undefined ||
    checkIn === "" ||
    checkOut === ""
  ) {
    //방 침대 개수가 사람 수보다 많아야 함.
    const rooms = await Room.find({ amountOfBed: { $gte: guests } });
    return res.status(200).send({ result: "success", rooms });
  }
  // 예약이 불가능한 방 조회
  const roomsNotAvailable = await Reseravation.find({
    $and: [{ start: { $lt: checkOut } }, { end: { $gt: checkIn } }],
  });

  console.log(roomsNotAvailable);
  // $nin 쓰기 위해 roomId만 추출해서 list 생성
  const notAvailList = roomsNotAvailable.map((room) => room.roomId);
  // $nin 쿼리로 NotAvailable에있는 것을 제외하고 조회
  const rooms = await Room.find({
    $and: [
      {
        _id: { $nin: notAvailList },
      },
      {
        amountOfBed: {
          $gte: guests,
        },
      },
    ],
  });

  console.log("사용 가능한 방", rooms);

  return res.status(200).send({ result: "success", rooms });
};

// CREATE Room : Dummy data
export const postRooms = async (req, res) => {
  const {
    title,
    host,
    description,
    category,
    pricePerDay,
    amountOfBed,
    rating,
    imageUrl,
    location,
    languages,
    rules,
  } = req.body;

  const newRoom = {
    title,
    host,
    description,
    category,
    pricePerDay,
    amountOfBed,
    rating,
    imageUrl,
    location,
    languages,
    rules,
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

// list 1
// export const getRoomsByLocation = (req, res) => {
//   const { scale } = req.query;
//   return res.status(200).send({ scale });
// };

/* list2 

*/
export const getRoomsByFilter = async (req, res) => {
  const filter = req.query;

  // const rooms = await Room.find({
  //   filter: {
  //     $in: [filter],
  //   },
  // });
  return res.status(200).send();
};
