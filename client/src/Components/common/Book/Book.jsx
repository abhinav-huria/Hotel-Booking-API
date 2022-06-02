import { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import queryString from "query-string";

import { authContext } from "../../Context/authContext";
import { getRoom } from "../../API/Rooms";
import { getHotel } from "../../API/Hotel";
import { bookRoom } from "../../API/Booking";
import "./booking.css";

const Book = () => {
  const [room, setRoom] = useState({});
  const [hotel, setHotel] = useState({});
  const [error, setError] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const { user } = useContext(authContext);
 
  let totalprice, cIn, tdays, cOut;

  const checkIn = localStorage.getItem("checkin");
  const checkOut = localStorage.getItem("checkout");
  const guests = localStorage.getItem("guests");

  const { roomId } = queryString.parse(location.search);

  useEffect(() => {
    async function fetchData() {
      const response = await getRoom(roomId);
      setRoom(response.data);
      const hotelResponse = await getHotel(response.data.hotelId);
      setHotel(hotelResponse.data);
    }
    fetchData().catch((err) => {
        setError(err);
      });
  }, []);

  const days = () => {
    let difference = checkOut - checkIn;
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    cIn = new Date(Number(checkIn)).toDateString();
    cOut = new Date(Number(checkOut)).toDateString();
    tdays = TotalDays;
    return TotalDays;
  };

  const totalPrice = () => {
    totalprice = days() * room.pricePerNight;
  };

  totalPrice();

  const handleBooking = () => {
    let booking = {
      endAt: checkOut,
      startAt: checkIn,
      totalPrice: totalprice,
      roomId: room._id,
      guests: guests,
      userId: user,
      hotelId: room.hotelId,
    };

    if (
      localStorage.getItem("isAuthenticated") === "false" ||
      localStorage.getItem("isAuthenticated") === null
    ) {
      navigate(`/login?redirectTo=${location.pathname}${location.search}`);
    } 
    else {
      bookRoom(user, room._id, booking)
        .then((res) => {
         

          navigate(`/booking/${res._id}`);
        })
        .catch((err) => {
          setError("Uh oh! Someone already booked this room");
         
        });
    }
  };
  return (
    <>
      <div className="container full-height">
        {error && <h3 className="error white-text">{error}</h3>}

        <div className="row">
          <h4 className="white-text">Confirm your booking</h4>
        </div>
        <div className="booking-conf-div">
          <div className="row">
            <div className="col-md-6">
              <h4>{hotel.name}</h4>
              <h6>{hotel.address}</h6>
              <br />
              <p>Room details:</p>
              <h6>{room.name}</h6>
              <p>{room.description}</p>
            </div>
            <div className="col-md-6">
              <button className="btn btn-danger" onClick={handleBooking}>
                Book Now
              </button>
              <h6>
                Rs {totalprice} +{" "}
                <span className="small-text">applicable taxes</span>
              </h6>

              <br />
              <h6>Check in:{cIn}</h6>
              <h6>Check out:{cOut}</h6>
              <h6>
                {guests} guests for {tdays} night(s)
              </h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Book;
