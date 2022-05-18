import BookingComponent from "../../common/Bookingcomponent/BookingComponent.jsx";
import hotel1 from "../../assets/images/hotel1.jpg";
import hotel2 from "../../assets/images/hotel2.jpg";
import hotel3 from "../../assets/images/hotel3.jpg";

import './home.css';
const Home = () => {
    return (
        <>
            {/* <Navbar /> */}
           <div className="outer-cont-search">
           <h2 className="search-heading">Book your next stay at exciting prices!</h2>
                 <div className="inner-cont-search">
                
                 <BookingComponent/>
                 </div>
                 </div>    
                   <div className="sample-images">
                     <img src={hotel1} alt="sample-image" className="sample-image"/>
                        <img src={hotel2} alt="sample-image" className="sample-image"/>
                        <img src={hotel3} alt="sample-image" className="sample-image"/>
                   </div>
        </>
    );
    }

    export default Home;