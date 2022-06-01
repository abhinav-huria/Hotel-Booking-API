import { useContext, useState } from "react";
import { authContext } from "../../Context/authContext";
import { searchContext } from "../../Context/search";
import { getHotelByCity } from "../../API/Hotel.js";
import { useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import hotel1 from "../../assets/images/hotel1.jpg";
import hotel2 from "../../assets/images/hotel2.jpg";
import hotel3 from "../../assets/images/hotel3.jpg";
import hotel4 from "../../assets/images/hotel4.jpg";
import "./hotels.css";
const Hotels = () => {
  const { city, guests,dates } = useContext(searchContext);
  console.log(guests);
  const { user } = useContext(authContext);
  const [hotels, setHotels] = useState([]);
  let link;
  let pic;
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
      <div className="row">
      <div className="col-md-2">
      </div>
      <div className="col-md-8 outer-box-1">
        {hotels.map((hotel,index) => ((link=`/viewhotel/?id=${hotel._id}&startDate=${new Date(dates[0]).getTime()}&endDate=${new Date(dates[1]).getTime()}`, pic=`hotel2`),
          (
          <div key={hotel.name} className="card round-border">
            <div className="row no-gutters">
              <div className="col-sm-5">
                <img
                  className="card-img"
                  src={ (index%4===0) ?hotel1:(index%4===1)? hotel2 :(index%4===2)? hotel3:(index%4===3) ?hotel4:hotel1}
                  alt="hotel"
                />
              </div>
              <div className="col-sm-7">
                <div className="card-body">
                  <h5 className="card-title">{hotel.name}</h5>
                  <p className="card-text small-text">
                    {hotel.rating}⭐ -{hotel.address}
                  </p>
                  <p className="card-text">{hotel.description}</p>
                  <a href={link} className="btn btn-danger">
                    Book now
                  </a>
                </div>
              </div>
            </div>
          </div>
        )))}
      </div>
        <div className="col-md-2">
      </div>
      </div>
      </div>
    </>
  );
};

export default Hotels;
