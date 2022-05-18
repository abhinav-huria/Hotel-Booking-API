import axios from "axios";

export const bookRoom = async (data) => {
  try {
        const res = await axios
            .post("http://localhost:3003/api/v1/bookings", data);
        return res.data;
    } catch (err) {
        console.log(err);
    }
}