import { useEffect, useState,useContext } from "react";
import { getHotel } from "../../API/Hotel";
import { getRoomsByHotel } from "../../API/Rooms";
import { useLocation, useNavigate, Link } from "react-router-dom";
import queryString from "query-string";
import  HotelRooms  from "./HotelRooms";
import { bookRoom } from "../../API/Booking";
import { searchContext } from "../../Context/search";

const Hotel = () => {
    const { city, dates, guests } = useContext(searchContext);
    console.log(dates);
  const [hotel, setHotel] = useState({});
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();
 


  useEffect(() => {
    const { id } = queryString.parse(location.search);
    getHotel(id)
      .then((res) => {
        setHotel(res.data);
        setError(null);
        console.log(res.data);
      })
      .catch((err) => {
        setError(err);
      });

    getRoomsByHotel(id)
      .then((res) => {
        console.log(res);
        setRooms(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        setError(err);
      });
  }
  
  
  
  , []);

    const navigate = useNavigate();

  console.log(hotel.hotelAmenities);
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {/* <img src={hotel.photos[0]} alt=""/> */}
            abc
          </div>
        </div>
        <div className="row">
          <div className="col-md-10">
            <h2>{hotel.hotelName}</h2>
            <h4>{hotel.hotelAddress}</h4>
          </div>
          <div className="col-md-2">
            <h5>{hotel.hotelRating}⭐</h5>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <p>{hotel.hotelDescription}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <ul>
            {/* <li>{hotel.hotelAmenities[0]}</li> */}
                    {hotel.hotelAmenities?.map((amenity) => (
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
  );
};

export default Hotel;
