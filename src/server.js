import express from "express";
import roomsRouter from "./routers/roomsRouter.js";
import usersRouter from "./routers/usersRouter.js";
import reservationRouter from "./routers/reservationRouter.js";
import db from "./db.js";

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// console.log(process.cwd() + "/views");

// serve local files to virtual browser file system
// app.use("/static", express.static("client"));

app.use("/api/reservation", reservationRouter);
app.use("/api/rooms", roomsRouter);
app.use("/api/users", usersRouter);

const handleListening = () => {
  console.log(`Server listening on port http://localhost:${PORT}😀`);
};

app.listen(PORT, handleListening);


