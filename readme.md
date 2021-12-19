# 에어비엔비 클론 코딩 (백엔드)!

## <div align=left> 프로젝트 개요 </div>

에어비엔비를 부셔보자!

## <div align=left> 기술 스택 </div>

- Node.js
- express
- NoSQL(mongoDB)
- mongoose
- AWS EC2

## <div align=left> 구현 기능 </div>

- 로그인/로그아웃
- 리뷰 남기기 (평점 적용)
- 방 정보 조회(필터, 페이지네이션)
- 예약 필터링 기능

## <div align=left> 기억에 남는 것 </div>

1. 여러개의 query string 받아 처리하기

- 이번 클론 코딩에서 처음으로 query string을 썼다. 이 전까지는 특정 데이터에 대한 조회만 필요했기에 path parameter만 사용했기 때문이다.
- 7개의 query string을 받는 상황에서 각 query마다 예외처리를 어떻게 해야 할지 고민했다. 2^7 개의 경우의 수를 if문으로 처리하려고 시도했다. if 문을 20개 정도 작성하다가 도저히 이건 아닌것 같아서 멘토님에게 질문하니, 좋은 방법을 알려주셨다.
- Query로 사용할 문자열을 만든 다음에, 각 query string이 있을 때마다 문자열을 연결한 다음, ORM에 사용했다.

```jsx
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

const rooms = await Room.find({
  $where: findQuery,
});
```

2. 페이지네이션

- 페이지네이션도 처음 해봤다. 프론트엔드에 웹 개발 고수 분이 계셔서 원리를 간단하게 설명듣고 직접 구현해보았다.

```jsx
const { page } = req.query;
const pageCnt = Number(page);
const limit = 10;
const offset = (pageCnt - 1) * limit;

const roomsTotal = await Room.find({
  $where: findQuery,
});

const rooms = await Room.find({
  $where: findQuery,
})
  .limit(limit)
  .skip(offset);

const totalPageCnt =
  roomsTotal.length % limit == 0
    ? parseInt(roomsTotal.length / limit)
    : parseInt(roomsTotal.length / limit) + 1;
```

3. 방 조회 시 예약된 날짜 제외하기

- 방 조회 시 예약된 방은 어떻게 제외시킬지, 어떤 값을 판별해야할지 고민하다가, 생각보다 간단하게 해결되었다.
- 예약된 방의 checkIn, checkOut과, 사용자가 조회하고자 하는 ckeckIn, checkOut의 경계 값만 비교하면 되지 않을까? 라는 생각이 떠올라서 바로 코드로 구현해 보았다.
- 혹시 내가 생각하지 못한 반례가 있을까 싶어 여러 반례를 생각해 테스트 해보았지만 잘 작동하였다.

```jsx
const notAvailList = [];
if (check_in && check_out) {
  // 쿼리 스트링에 체크인 체크아웃이 있으면 예약불가능한 방을 조회
  const roomsNotAvailable = await Reseravation.find({
    $and: [{ start: { $lt: check_out } }, { end: { $gt: check_in } }],
  });
  //roomId만 추출
  notAvailList = roomsNotAvailable.map((room) => room.roomId);
}

const rooms = await Room.find({
  $and: [{ $where: findQuery }, { _id: { $nin: notAvailList } }],
})
  .limit(limit)
  .skip(offset);
```

- 사용자가 원하는 체크아웃 날짜보다 예약된 방의 체크인 날짜가 작거나, 사용자가 원하는 체크인 날짜보다 예약된 방의 체크아웃 날짜가 클 경우, 그러니까 경계값만 잘 비교해주면 된다.
- 날짜의 경우 'YYYY-MM-dd' 포맷 문자열 타입으로 저장했고, 대소 비교도 잘 되었다.
