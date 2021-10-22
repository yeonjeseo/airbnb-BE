import Room from "../models/Room.js";
import Review from "../models/Review.js";
import Reseravation from "../models/Reservation.js";

export const getRoomsFlexible = async (req, res) => {
  const {
    category,
    check_in,
    check_out,
    guests,
    english,
    korean,
    deutch,
    pet,
    smoking,
    page,
  } = req.query;
  /*
    필요 기능 
    - 페이지네이션
    - 쿼리 여러개 처리 - ok
  */
  const pageCnt = Number(page);
  const limit = 10;
  const offset = (pageCnt - 1) * limit;

  // reduce???
  let findQuery = "";
  if (category) findQuery += `this.category == '${category}' `;
  if (guests) findQuery += `&& this.people > ${guests} `;
  if (english == "true") findQuery += `&& this.english == ${true} `;
  if (korean == "true") findQuery += `&& this.korean == ${true} `;
  if (deutch == "true") findQuery += `&& this.deutch == ${true} `;
  if (pet == "true") findQuery += `&& this.pet == ${true} `;
  if (smoking == "true") findQuery += `&& this.smoking == ${true} `;

  // category가 없을 경우, string 제일 앞 && 제거
  let queryArray = findQuery.split(" ");
  if (queryArray[0] == "&&") {
    queryArray.shift();
    findQuery = queryArray.join(" ");
  }

  try {
    let notAvailList = [];
    if (check_in && check_out) {
      //체크인 체크아웃이 있으면 예약불가능한 방을 조회
      const roomsNotAvailable = await Reseravation.find({
        $and: [{ start: { $lt: check_out } }, { end: { $gt: check_in } }],
      });
      //roomId만 추출
      notAvailList = roomsNotAvailable.map((room) => room.roomId);
    }
    //findQuery가 비어있을 경우 $where 사용 불가능하므로 예외 처리
    //여기는 흠 list1일 경우가 될 거니까
    if (findQuery === "") {
      const roomsTotal = await Room.find({ _id: { $nin: notAvailList } });
      const rooms = await Room.find({ _id: { $nin: notAvailList } })
        .limit(limit)
        .skip(offset)
        .sort({ distance: 1 });

      //나머지가 있으면 페이지 수 + 1 아니면 몫
      const totalPageCnt =
        roomsTotal.length % limit == 0
          ? parseInt(roomsTotal.length / limit)
          : parseInt(roomsTotal.length / limit) + 1;
      return res
        .status(200)
        .send({ result: "success", rooms, totalPageCnt, page });
    }

    const roomsTotal = await Room.find({
      $and: [{ $where: findQuery }, { _id: { $nin: notAvailList } }],
    });
    const rooms = await Room.find({
      $and: [{ $where: findQuery }, { _id: { $nin: notAvailList } }],
    })
      .limit(limit)
      .skip(offset);
    const totalPageCnt =
      roomsTotal.length % limit == 0
        ? parseInt(roomsTotal.length / limit)
        : parseInt(roomsTotal.length / limit) + 1;

    return res
      .status(200)
      .send({ result: "success", rooms, totalPageCnt, page });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ result: "failure" });
  }
};

// CREATE Room : Dummy data
export const postRooms = async (req, res) => {
  const {
    title,
    host,
    description,
    category,
    price,
    people,
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
    price,
    people,
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
  try {
    const room = await Room.findById(roomId);
    const reviews = await Review.find({ homeId: roomId }).sort({
      createdAt: -1,
    });
    return res.status(200).send({ result: "success", room, reviews });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ result: "failure" });
  }
};
