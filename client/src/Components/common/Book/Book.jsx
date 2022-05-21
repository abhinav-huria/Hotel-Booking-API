import { useContext,useState,useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"
import quertString from "query-string";
import { searchContext } from "../../Context/search";
import { getRoom } from "../../API/Rooms";
import { getHotel } from "../../API/Hotel";
const Book = () => {
    const location = useLocation();
let totaldays;
let cIn,tdays;
let cOut,cOut1;
  const checkIn=localStorage.getItem("checkin");
    const checkOut=localStorage.getItem("checkout");
    const guests=localStorage.getItem("guests");
    console.log(checkIn);
const[room,setRoom]=useState({});
const[hotel,setHotel]=useState({});
const[error,setError]=useState(null);
const navigate=useNavigate();
const{roomId}=quertString.parse(location.search);
useEffect(()=>{
    async function fetchData(){
    const response = await getRoom(roomId);
    setRoom(response.data);
    const hotelResponse=await getHotel(response.data.hotelId);
    setHotel(hotelResponse.data);
}
fetchData();
    // getHotel(room.hotelId).then(res=>{
    //     setHotel(res.data);
    //     setError(null);
    // }).catch(err=>{
    //     setError(err);
    // });


},[])
const days = () =>{
    let difference = checkOut - checkIn;
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    cIn=new Date(Number(checkIn)).toDateString();
    cOut=new Date(Number(checkOut)).toDateString();
    // cIn1=cIn.toDateString();
    // cOut1=cOut.toDateString();
    // console.log(cIn1);
    // console.log(cOut1);
    // console.log(cIn);
    //cOut1=cOut.toString();
    tdays=TotalDays;
    return TotalDays;
}
const totalPrice=()=>{
    totaldays= days()*room.pricePerNight;
}
totalPrice();
console.log(room);

    return(
        <>
        <div className="container">
        <div className="row">
           <h5>Confirm your booking</h5>
        </div>
              <div className="row">
                    <div className="col-md-6">
                        <h4>{hotel.hotelName}</h4>
                        <h6>{hotel.hotelAddress}</h6>
</div>
<div className="col-md-6">
<h6>Rs{totaldays}</h6>
</div></div>
<div className="row">
<div className="col-md-6">
<h6>{room.name}</h6>
<p>{room.description}</p>
</div>
<div className="col-md-6">
<h6>Check in:{cIn}</h6>
<h6>Check out:{cOut}</h6>
<h6>{guests} guests {tdays}</h6>
                        </div></div>
            </div>
        </>
    )
}

export default Book;
