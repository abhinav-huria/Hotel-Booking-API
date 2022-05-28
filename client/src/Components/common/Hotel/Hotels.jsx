import { useContext, useState } from "react";
import { authContext } from "../../Context/authContext";
import { searchContext } from "../../Context/search";
import { getHotelByCity } from "../../API/Hotel.js";
import { useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import "./hotels.css";
const Hotels = () => {
  const { city, guests,dates } = useContext(searchContext);
  console.log(guests);
  const { user } = useContext(authContext);
  const [hotels, setHotels] = useState([]);
  let link;
  const location = useLocation();
  // const { dates } = location.state;
  console.log(dates);
  console.log(new Date(dates[0]).getTime());
  // const {city,date,guests}=search;
  //console.log(city);
  // console.log(city);
  useEffect(() => {
    getHotelByCity(city).then((res) => {
      if (res.status === 200) {
        console.log(res.data);
        setHotels(res.data);
      }
    });
  }, [city]);

  return (
    <>
      <div className="container">
        {hotels.map((hotel) => ((link=`/viewhotel/?id=${hotel._id}&startDate=${new Date(dates[0]).getTime()}&endDate=${new Date(dates[1]).getTime()}`),
          (
          <div key={hotel.name} className="card">
            <div className="row no-gutters">
              <div className="col-sm-5">
                <img
                  className="card-img"
                  src="/images/defaultimg.png"
                  alt="Suresh Dasari Card"
                />
              </div>
              <div className="col-sm-7">
                <div className="card-body">
                  <h5 className="card-title">{hotel.name}</h5>
                  <p className="card-text small-text">
                    {hotel.rating}⭐ -{hotel.address}
                  </p>
                  <p className="card-text">{hotel.description}</p>
                  <a href={link} className="btn btn-primary">
                    Book now
                  </a>
                </div>
              </div>
            </div>
          </div>
        )))}
      </div>
    </>
  );
};

export default Hotels;
