import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getBooking } from "../../API/Booking";
import { getHotel } from "../../API/Hotel";
import { getRoom } from "../../API/Rooms";


const Booking = () => {
  const location = useLocation();

  const [hotel, setHotel] = useState({});
  const [room, setRoom] = useState({});
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [booking, setBooking] = useState({});

  const id = location.pathname.split("/")[2];

  useEffect(() => {
    async function fetchData() {
      const response = await getBooking(id);
      setBooking(response);
      setStart(response.startAt.split("T")[0]);
      setEnd(response.endAt.split("T")[0]);
      const hotelResponse = await getHotel(response.hotelId);
      setHotel(hotelResponse.data);
      const roomResponse = await getRoom(response.roomId);
      setRoom(roomResponse.data);
    }
    fetchData();
  }, [id]);

  return (
    <>
      <div className="container">
        <div className="outer-box-1">
          <div className="white-bg-1">
            <h3>
              Your booking is confirmed! Have a pleasant stay.{" "}
              <span>
                <a href="/" className="btn btn-danger float-right">
                  Return Home
                </a>
              </span>
            </h3>

            <div className="card">
              <h4>{hotel.hotelName}</h4>
              <p>Room: {room.name}</p>
              <p>Check in:{start}</p>
              <p>Check out: {end}</p>
              <p>Guests: {booking.guests}</p>
              <p>Amount paid: {booking.totalPrice}</p>
            </div>
            <ul>
              <li> Please carry a valid ID card</li>
              <li>
                {" "}
                Please check out at least 15 minutes before the check out time
              </li>
              <li>
                <a href="/help">Click here</a> for help
              </li>
              <li>
                You can check your bookings using the{" "}
                <a href="/mybookings">my bookings</a> section
              </li>
              <li>
                We are not liable for any discrepamcies/losses you may
                experience during your stay
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Booking;
