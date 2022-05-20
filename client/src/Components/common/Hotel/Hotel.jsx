import { useEffect,useState } from "react";
import {getHotel} from '../../API/Hotel';
import { getRoomsByHotel } from "../../API/Rooms";
import { useLocation, useNavigate, Link } from "react-router-dom";
import queryString from "query-string";
const Hotel = () => {
    const [hotel, setHotel] = useState({});
    const [rooms, setRooms] = useState([]);
    const [error, setError] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const { id } = queryString.parse(location.search);
getHotel(id).then(res => {
    setHotel(res.data);
    setError(null);
    console.log(res.data);
    // console.log(hotel.hotelRooms);
    // hotelRooms.map(room => {
    //     console.log(room+"__");
    //     getRoom(room).then(res => {
    //         setRooms(rooms => [...rooms, res.data]);
    //       // console.log(rooms);
    //     }).catch(err => {
    //         setError(err);
    //     });
    //     });
}).catch(err => {
    setError(err);
})

getRoomsByHotel(id).then(res => {
    console.log(res);
    setRooms(res.data);
    console.log(res.data);
}).catch(err => {
    setError(err);
})



 
// getRoomsByHotel(id).then(res => {
//     setRooms(res.data);
//     setError(null);
//     console.log(res.data);
// }).catch(err => {
//     setError(err);
// });


    },[])
    
    return (
        <div>
             <div className="container">
                <div className="row">

                    <div className="col-md-12">
                    {/* <img src={hotel.photos[0]} alt=""/> */}
                    abc
                    </div></div>
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
                    {/* <ul>
                    {hotel.hotelAmenities.map(amenity => (
                        <li key={amenity}>{amenity}</li>
                    ))}
                    </ul> */}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
<h5>Room options:</h5>
</div>
{/* {hotel.hotelRooms.map(room => (

    ))} */}
</div>
                 </div>          
        </div>
    )
    }


    export default Hotel;