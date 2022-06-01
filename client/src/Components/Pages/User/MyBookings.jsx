import { useState,useEffect } from "react";
import { getUserBookings } from "../../API/Booking";

const MyBookings = () => {


    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    let userId = localStorage.getItem("user");
    // const getBookings = async () => {
    //     setIsLoading(true);
    //     try {
    //         const bookings = await getUserBookings(userId);
    //         setBookings(bookings);
    //         setIsLoading(false);
    //     } catch (error) {
    //         setError(error);
    //         setIsLoading(false);
    //     } 
    // };
    
    useEffect(() => {
       
        getUserBookings(userId).then
        (bookings => {
            setBookings(bookings);
            setIsLoading(false);
        }).catch(error => {
            setError(error);
            setIsLoading(false);
        });
    }, []);
    return (
        <div>
        <h1>My Bookings</h1>
        {isLoading ? (
            <div>Loading...</div>
        ) : error ? (
            <div>{error.message}</div>
        ) : (
            <ul>
            {bookings?.map((booking) => (
                <li key={booking.id}>
                {booking.roomId} - {booking.startAt} - {booking.endAt}
                </li>
            ))}
            </ul>
        )}
        </div>
    );
    }

    export default MyBookings;