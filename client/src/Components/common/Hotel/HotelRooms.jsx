import { useNavigate } from "react-router-dom";
import {Link } from "react-router-dom";

const HotelRooms = ({rooms}) => {
    const navigate = useNavigate();
let link;
   
    return (
        <div className="col-md-12">
        <div className="row">
            <div className="col-md-12">
            <h5>Room options:</h5>
            </div>
        </div>
        {rooms.map((room) => (( link=`/bookRoom/?roomId=${room._id}`),(
            <div className="row" key={room._id}>
            <div className="col-md-12">
                <div className="card">
                <div className="card-body">
                    <div className="row">
                    <div className="col-md-4">
                        {/* <img src={room.photos[0]} alt="" /> */}
                    </div>
                    <div className="col-md-6">
                        <h5>{room.name}</h5>
                        <p>{room.description}</p>
                        <p>{room.pricePerNight}</p>
                    </div>
<div className="col-md-2">
<Link to={link} className="btn btn-primary">Book</Link>
    </div>

                    </div>
                </div>

                </div>
            </div>
            </div>
        )))}
        </div>
    );
    };

    export default HotelRooms;