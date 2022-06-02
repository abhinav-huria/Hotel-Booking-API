import { useState, useEffect } from "react";
import { getHotel } from "../../API/Hotel";
import { getRoom } from "../../API/Rooms";

import "./cards.css";

import hotel1 from "../../assets/images/hotel1.jpg";
import hotel2 from "../../assets/images/hotel2.jpg";
import hotel3 from "../../assets/images/hotel3.jpg";
import hotel4 from "../../assets/images/hotel4.jpg";

const BookingCard = ({ booking, index }) => {
  let { userId, roomId, startAt, endAt, guests, totalPrice, hotelId } = booking;

  startAt = startAt.split("T")[0];
  endAt = endAt.split("T")[0];

  const [hotel, setHotel] = useState({});
  const [room, setRoom] = useState({});

  useEffect(() => {
    getHotel(hotelId)
      .then((hotel) => {
        setHotel(hotel.data);
       
      })
      .catch((error) => {
        console.log("Something went wrong");
      });
    getRoom(roomId)
      .then((room) => {
        setRoom(room.data);
      })
      .catch((error) => {
        console.log("Something went wrong");
      });
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div className="card booking-card">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-4">
                    <img
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
                      className="hotel-image"
                    />
                  </div>
                  <div className="col-md-8">
                    <h5 className="card-title">
                      {hotel.name}
                      <span className="float-right">{hotel.rating}⭐</span>
                    </h5>
                    <p className="card-text">
                      Room: {room.name}{" "}
                      <span className="float-right">
                        Address: {hotel.address}
                        <br />
                        Phone:{hotel.phoneNumber}
                      </span>
                    </p>

                    <p className="card-text">Guests: {guests}</p>
                    <p className="card-text">
                      Check in: {startAt} | Check out: {endAt}
                    </p>
                    <p className="card-text">Amount paid: INR{totalPrice}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
    </>
  );
};

export default BookingCard;
