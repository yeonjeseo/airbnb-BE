export const postReservation = async (req, res) => {
  const {
    params: { roomId },
    body: { start, end, amountOfGuests },
    user: { userId },
  } = req;
};
