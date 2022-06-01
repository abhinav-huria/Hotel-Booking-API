import { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import quertString from "query-string";
import { searchContext } from "../../Context/search";
import { authContext } from "../../Context/authContext";
import { getRoom } from "../../API/Rooms";
import { getHotel } from "../../API/Hotel";
import { bookRoom } from "../../API/Booking";
const Book = () => {
    const {user}= useContext(authContext);
  const location = useLocation();
  let totalprice;
  let cIn, tdays;
  let cOut, cOut1;
  const checkIn = localStorage.getItem("checkin");
  const checkOut = localStorage.getItem("checkout");
  const guests = localStorage.getItem("guests");
  console.log(checkIn);
  const [room, setRoom] = useState({});
  const [hotel, setHotel] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { roomId } = quertString.parse(location.search);
  useEffect(() => {
    async function fetchData() {
      const response = await getRoom(roomId);
      setRoom(response.data);
      const hotelResponse = await getHotel(response.data.hotelId);
      setHotel(hotelResponse.data);
    }
    fetchData();
    // getHotel(room.hotelId).then(res=>{
    //     setHotel(res.data);
    //     setError(null);
    // }).catch(err=>{
    //     setError(err);
    // });
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
  console.log(room);
const handleBooking = () => {
   let booking = {
    endAt: checkOut,
    startAt: checkIn,
    totalPrice: totalprice,
    roomId: room._id,
    guests: guests,
    userId: user,
    hotelId: room.hotelId
    };
    console.log(booking);
    console.log(localStorage.getItem("isAuthenticated"));
    //console.log(location);
    if(localStorage.getItem("isAuthenticated")==="false" || localStorage.getItem("isAuthenticated")===null){

      navigate(`/login?redirectTo=${location.pathname}${location.search}`);
      
  }
  else{
    bookRoom(user,room._id,booking).then(res=>{
        console.log(res);
        
       
       navigate(`/booking/${res._id}`);

    }).catch(err=>{
      setError("Uh oh! Someone already booked this room");
        console.log(err);
    });
}
};
  return (
    <>
      <div className="container">
      {error && <p className="error">{error}</p>}
      <div className="box">
        <div className="row">
          <h5>Confirm your booking</h5>
        </div>
        <div className="row">
          <div className="col-md-6">
            <h4>{hotel.hotelName}</h4>
            <h6>{hotel.hotelAddress}</h6>
          </div>
          <div className="col-md-6">
            <h6>Rs {totalprice} + <span className="small-text">applicable taxes</span></h6>
            <button className="btn btn-primary" onClick={handleBooking}>Book Now</button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
          <p>Room details:</p>
            <h6>{room.name}</h6>
            <p>{room.description}</p>
          </div>
          <div className="col-md-6">
            <h6>Check in:{cIn}</h6>
            <h6>Check out:{cOut}</h6>
            <h6>
              {guests} guests {tdays}
            </h6>
          </div>
        </div>
      </div></div>
    </>
  );
};

export default Book;
