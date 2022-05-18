import { useState, useEffect ,useContext } from "react";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import { Form, Button } from "react-bootstrap";
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-calendar/dist/Calendar.css";
import "./booking.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { searchContext } from "../../../../context/searchContext.js";
const BookingComponent = (props) => {
  const [city, setCity] = useState("Chandigarh");
  const [guests, setGuests] = useState(1);
  const [date, setDate] = useState([new Date(), new Date()]);
  const [cities, setCities] = useState([]);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleDateChange = () => {
    alert(guests);
  };

  const { dispatch } = useContext(searchContext);

  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { city, date, guests } });
    navigate(`/hotels`, { state: { city, date, guests } });
  };

  useEffect(() => {
    axios
      .get("http://localhost:3003/api/v1/hotels/availableCities/c")
      .then((res) => {
        setCities(res.data);
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
            <option value={0} key={0}>
              Please select city
            </option>
            {cities.map((city) => (
              <option value={city} key={city}>
                {city}
              </option>
            ))}
            {/* <option>Open this select menu</option>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option> */}
          </Form.Select>
          <DateRangePicker
            className="date-picker"
            onChange={setDate}
            value={date}
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
            className="btn-booking"
            onClick={handleSearch}
          >
            Submit
          </Button>{" "}
          {/* <button type="button" className="btn-booking" onClick={handleDateChange}>Submit</button> */}
        </div>
      </div>
      {/* <button onClick={() => props.handleBooking(city, date)}>Book</button> */}
    </>
  );
};

export default BookingComponent;
