import { useContext,useState } from "react";
import {authContext} from "../../Context/authContext";
import {searchContext} from "../../Context/search";
import { getHotelByCity } from "../../API/Hotel.js";
import { useEffect } from "react";
import { Card,Button } from "react-bootstrap";
import './hotels.css';
const Hotels = () => {
    const {city, dates,guests}=useContext(searchContext);
    const {user}=useContext(authContext);
    const [hotels,setHotels]=useState([]);
  // const {city,date,guests}=search;
   console.log(city);
  // console.log(city);
    useEffect (()=>{
        getHotelByCity(city).then((res)=>{
            if(res.status===200){
                console.log(res.data);
                setHotels(res.data);
                            }
        });
    },[city]);

   return(
         <> 
               <div className="container">
               {hotels.map((hotel)=>(
                   
    <div className="card" >
    <div className="row no-gutters">
        <div className="col-sm-5">
            <img className="card-img" src="/images/defaultimg.png" alt="Suresh Dasari Card" />
        </div>
        <div className="col-sm-7">
            <div className="card-body">
                <h5 className="card-title">{hotel.hotelName}</h5>
                <p className="card-text small-text">{hotel.hotelRating}⭐ -{hotel.hotelAddress}</p>
                <p className="card-text">{hotel.hotelDescription}</p>
                <a href="#" className="btn btn-primary">Book now</a>
            </div>
        </div>
    </div>
    </div>
              ) )}
            </div>        
             </>   )

           }
      

export default Hotels;


    
              
