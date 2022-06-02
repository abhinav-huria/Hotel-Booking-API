import { useState, useEffect, useContext } from "react";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import { Form, Button } from "react-bootstrap";
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-calendar/dist/Calendar.css";
import "./booking.css";
import { useNavigate } from "react-router-dom";
import { searchContext } from "../../Context/search.js";
import { getAvailableCities } from "../../API/Hotel";

const SearchComponent = () => {
  const today = new Date();
  const [city, setCity] = useState("");
  const [guests, setGuests] = useState(0);
  const [dates, setDates] = useState([
    new Date(),
    new Date(today.getTime() + 24 * 60 * 60 * 1000),
  ]);

  const [cities, setCities] = useState([]);

  const navigate = useNavigate();

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const { dispatch } = useContext(searchContext);

  const handleSearch = () => {
    if (
      guests > 0 &&
      dates[0] !== null &&
      dates[1] !== null &&
      city !== "def" &&
      city !== ""
    ) {
      dispatch({ type: "NEW_SEARCH", payload: { city, dates, guests } });
      localStorage.setItem("checkin", dates[0].getTime());
      localStorage.setItem("checkout", dates[1].getTime());
      localStorage.setItem("guests", guests);
      navigate(`/hotels`, { state: { city, dates, guests } });
    } else {
      alert("Please fill all the fields");
    }
  };

  useEffect(() => {
    getAvailableCities()
      .then((res) => {
        setCities(res.data);
      })
      .catch((err) => {
        console.log("Something bad happened");
      });
  }, []);

  return (
    <>
      <div className="cont-booking-form">
        <div className="inner-cont-booking-form">
          <Form.Select
            onChange={handleCityChange}
            className="select-city"
            aria-label="Default select"
          >
            <option value="def" key={-1}>
              City
            </option>
            {cities.map((city) => (
              <option value={city} key={city}>
                {city}
              </option>
            ))}
          </Form.Select>
          <DateRangePicker
            onChange={setDates}
            value={dates}
            minDate={new Date()}
            maxDate={new Date(2022, 12, 31)}
          />
          <Form.Select
            onChange={(e) => setGuests(e.target.value)}
            className="guest-select"
            aria-label="Default select"
          >
            <option value={0} key={0}>
              Guests
            </option>
            <option value={1} key={1}>
              1
            </option>
            <option value={2} key={2}>
              2
            </option>
            <option value={3} key={3}>
              3
            </option>
            <option value={4} key={4}>
              4(Max)
            </option>
          </Form.Select>
          <Button
            type="button"
            className="btn btn-danger"
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>
      </div>
    </>
  );
};

export default SearchComponent;
