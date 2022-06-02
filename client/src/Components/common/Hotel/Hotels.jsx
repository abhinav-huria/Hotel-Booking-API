import { useEffect } from "react";
import { useContext, useState } from "react";
import { searchContext } from "../../Context/search";
import { getHotelByCity } from "../../API/Hotel.js";

import hotel1 from "../../assets/images/hotel1.jpg";
import hotel2 from "../../assets/images/hotel2.jpg";
import hotel3 from "../../assets/images/hotel3.jpg";
import hotel4 from "../../assets/images/hotel4.jpg";

import "./hotels.css";

const Hotels = () => {
  const { city, guests, dates } = useContext(searchContext);

  const [hotels, setHotels] = useState([]);
  let link;

  useEffect(() => {
    getHotelByCity(city).then((res) => {
      if (res.status === 200) {
        setHotels(res.data);
      }
    });
  }, [city]);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8 outer-box-1">
            {hotels.map(
              (hotel, index) => (
                ((link = `/viewhotel/?id=${hotel._id}&startDate=${new Date(
                  dates[0]
                ).getTime()}&endDate=${new Date(dates[1]).getTime()}`)),
                (
                  <div key={hotel.name} className="card round-border">
                    <div className="row no-gutters">
                      <div className="col-sm-5">
                        <img
                          className="card-img"
                          src={
                            index % 4 === 0
                              ? hotel1
                              : index % 4 === 1
                              ? hotel2
                              : index % 4 === 2
                              ? hotel3
                              : index % 4 === 3
                              ? hotel4
                              : hotel1
                          }
                          alt="hotel"
                        />
                      </div>
                      <div className="col-sm-7">
                        <div className="card-body">
                          <h5 className="card-title">
                            {hotel.name}{" "}
                            <span className="float-right">
                              {" "}
                              <a href={link} className="btn btn-danger">
                                View details
                              </a>
                            </span>
                          </h5>
                          <p className="card-text small-text">
                            {hotel.rating}⭐ -{hotel.address}
                          </p>
                          <p className="card-text">{hotel.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )
            )}
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
    </>
  );
};

export default Hotels;
