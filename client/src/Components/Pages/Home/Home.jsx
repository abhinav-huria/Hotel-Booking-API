import BookingComponent from "../../common/Bookingcomponent/BookingComponent.jsx";
import hotel1 from "../../assets/images/hotel1.jpg";
import hotel2 from "../../assets/images/hotel2.jpg";
import hotel3 from "../../assets/images/hotel3.jpg";
import React, { useContext } from "react";
import AddHotels from "../Admin/AddHotels.jsx";
import Dashboard from "../Admin/Dashboard.jsx";
import './home.css';
import AddRoom from "../Admin/AddRoom.jsx";
const Home = () => {
 
    return (
        <>
       
            {/* <Navbar /> */}
            <div className="container">
                <div className="row">
                  
                    <div className="col-md-2"></div>
                    <div className="col-md-8">
          <div className="search-container">
           <h2 className="search-heading">Book your next stay at exciting prices!</h2>
               
                
                 <BookingComponent/>
                 </div>
                 <div className="col-md-2"></div>
                 </div>
                 </div>  
                
                 </div>    
               
                   {/* <div className="sample-images">
                     <img src={hotel1} alt="sample-image" className="sample-image"/>
                        <img src={hotel2} alt="sample-image" className="sample-image"/>
                        <img src={hotel3} alt="sample-image" className="sample-image"/>
                   </div> */}
               
                
        </>
    );
    }

    export default Home;