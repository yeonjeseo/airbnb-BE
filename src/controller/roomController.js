import Room from "../models/Room.js";
import Review from "../models/Review.js";
import Reseravation from "../models/Reservation.js";

export const getRoomsFlexible = async (req, res) => {
  const {
    check_in,
    check_out,
    guests,
    category,
    english,
    korean,
    deutch,
    pet,
    smoking,
    languages,
    page,
  } = req.query;
  /*
    필요 기능 
    - 페이지네이션
    - 쿼리 여러개 처리 - ok
  */
  const pageCnt = Number(page);
  const limit = 5;
  const offset = (page - 1) * limit;

  let findQuery = "";
  if (category) findQuery += `this.category == '${category}' `;
  if (guests) findQuery += `&& this.people > ${guests} `;
  if (english == "true") findQuery += `&& this.english == ${true} `;
  if (korean == "true") findQuery += `&& this.korean == ${true} `;
  if (deutch == "true") findQuery += `&& this.deutch == ${true} `;
  if (pet == "true") findQuery += `&& this.pet == ${true} `;
  if (smoking == "true") findQuery += `&& this.smoking == ${true} `;
  console.log(findQuery);

  const rooms = await Room.find({ $where: findQuery })
    .limit(limit)
    .skip(offset);

  // let rooms;
  // if (check_in && check_out) {
  //   const roomsNotAvailable = await Reseravation.find({
  //     $and: [{ start: { $lt: check_out } }, { end: { $gt: check_in } }],
  //   });
  //   const notAvailList = roomsNotAvailable.map((room) => room.roomId);
  //   // $nin 쿼리로 NotAvailable에있는 것을 제외하고 조회
  //   rooms = await Room.find({
  //     $and: [
  //       {
  //         _id: { $nin: notAvailList },
  //       },
  //       {
  //         amountOfBed: {
  //           $gte: guests,
  //         },
  //       },
  //     ],
  //   });
  // } else if (guests) {
  //   rooms = await Room.find({
  //     $and: [
  //       { category: { $eq: category } },
  //       { amountOfBed: { $gte: guests } },
  //     ],
  //   });
  // } else if (rules) {
  //   rooms = await Room.find({
  //     $and: [
  //       { languages: { $in: languages } },
  //       { rules: { $in: rules } },
  //       {
  //         $and: [
  //           { pricePerDay: { $gte: price_min } },
  //           { pricePerDay: { $lte: price_max } },
  //         ],
  //       },
  //     ],
  //   });
  // }

  return res.status(200).send({ result: "success", rooms });
};

export const getRoomsLocation = async (req, res) => {
  const rooms = await Room.find({});

  return res.status(200).send(rooms);
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
    english,
    korean,
    deutch,
    pet,
    smoking,
    locationName,
    distance,
    available,
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
    english,
    korean,
    deutch,
    pet,
    smoking,
    locationName,
    distance,
    available,
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

export const getRoomsPagenation = async (req, res) => {
  // page = int(request.args.get('page', 1))
  //   limit = 16
  //   offset = (page - 1) * limit
  //   # default 출시순 desc
  //   car_list = list(db.carInfo.find({}).sort('car_age', -1).limit(limit).skip(offset))
  //   for _list in car_list:
  //           _list["_id"] = str(_list["_id"])
};
