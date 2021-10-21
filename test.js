let date = new Date();

const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();

const dateString = [year, month, day].join("-");
console.log(dateString);
