//DEPENDENCIES
import { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import queryString from "query-string";

//API CALLS
import { getHotel } from "../../API/Hotel";
import { getRoomsByHotel } from "../../API/Rooms";

//COMPONENT
import HotelRooms from "./HotelRooms";
import { searchContext } from "../../Context/search";

// import { bookRoom } from "../../API/Booking"; 

const Hotel = () => {
  const { city, guests,dates } = useContext(searchContext);
 
console.log(searchContext);

  const [hotel, setHotel] = useState({});
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();
  let bookingDates=[];

  //bookingDates
  //  const{ dates}= location.state;
  //  console.log(dates);

  useEffect(() => {

    const { id, startDate, endDate } = queryString.parse(location.search);
    console.log(startDate);
    getHotel(id)
      .then((res) => {
        setHotel(res.data);
        setError(null);
        console.log(res.data);
      })
      .catch((err) => {
        setError(err);
      });

function getBookingDates(){
  let start=new Date(Number(startDate));
  let end=new Date(Number(endDate));
  while(start<=end){
    bookingDates.push(start.getTime());
    start=new Date(start.setDate(start.getDate()+1));
  }
  console.log(bookingDates);
}
getBookingDates();
    getRoomsByHotel(id, startDate, endDate)
      .then((res) => {
        console.log(res);
        setRooms(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  const navigate = useNavigate();

  console.log(hotel.hotelAmenities);
  return (
    <div>
      <div className="container">
      <div className="outer-box-2">
      <div className="white-bg-1">
        <div className="row">
          <div className="col-md-12">
            {/* <img src={hotel.photos[0]} alt=""/> */}
          
          </div>
        </div>
        <div className="row">
          <div className="col-md-10">
            <h2>{hotel.name}</h2>
            <h4>{hotel.address}</h4>
          </div>
          <div className="col-md-2">
            <h5>{hotel.rating}⭐</h5>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <p>{hotel.description}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <ul>
              {/* <li>{hotel.hotelAmenities[0]}</li> */}
              {hotel.amenities?.map((amenity) => (
                <li key={amenity}>{amenity}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="row">
          <HotelRooms rooms={rooms} />
        </div>
      </div>
      </div>
      </div>
    </div>
  );
};

export default Hotel;
