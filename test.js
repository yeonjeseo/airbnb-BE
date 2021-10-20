let rule = ["pet", "smoking"];

let room = ["pet"];

let result = rule.forEach((elem) => {
  console.log(room.includes(elem));
});
