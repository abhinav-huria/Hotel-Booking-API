import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { bookRoom,getBooking } from "../../API/Booking";
import { getHotel } from "../../API/Hotel";
import { getRoom } from "../../API/Rooms";
const Booking = () => {
    const location = useLocation();
    const id=location.pathname.split("/")[2];
    const [hotel, setHotel] = useState({});
    const [room, setRoom] = useState({});
    const [start,setStart]=useState("");
    const [end,setEnd]=useState("");
   // const { id  } = queryString.parse(location.pathname);
    const [booking, setBooking] = useState({});
    useEffect(() => {
        async function fetchData() {
            const response = await getBooking(id);
            setBooking(response);
            setStart(response.startAt.split("T")[0]);
            setEnd(response.endAt.split("T")[0]);
            const hotelResponse = await getHotel(response.hotelId);

            setHotel(hotelResponse.data);
            const roomResponse = await getRoom(response.roomId);
            setRoom(roomResponse.data);
            

        }
        fetchData();
    }, []);

    return(
        <>
<h3>Your booking is confirmed</h3>
<div className="card">
<h4>{hotel.hotelName}</h4>
<p>Room: {room.name}</p>
<p>Check in:{start}</p>
<p>Check out: {end}</p>
<p>Guests: {booking.guests}</p>
<p>Amount paid: {booking.totalPrice}</p>

</div>
{/* <p>{booking.startAt.split("T")[0]}</p> */}
<p>{start}</p>
        </>
       
    )
}

export default Booking;