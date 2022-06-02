import SearchComponent from "../../common/Bookingcomponent/SearchComponent.jsx";
import React from "react";
import "./home.css";

const Home = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div className="search-container">
              <h2 className="search-heading">
                Book your next stay at exciting prices!
              </h2>

              <SearchComponent />
            </div>
            <div className="col-md-2"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
