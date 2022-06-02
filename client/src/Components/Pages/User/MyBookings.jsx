import { useState, useEffect } from "react";
import { getUserBookings } from "../../API/Booking";
import BookingCard from "../../common/Cards/BookingCard";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  let userId = localStorage.getItem("user");

  useEffect(() => {
    getUserBookings(userId)
      .then((bookings) => {
        setBookings(bookings);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <h1 className=" white-text">My Bookings</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error.message}</div>
      ) : (
        <ul>
          {bookings?.map((booking, index) => (
            <BookingCard key={booking._id} booking={booking} index={index} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyBookings;

