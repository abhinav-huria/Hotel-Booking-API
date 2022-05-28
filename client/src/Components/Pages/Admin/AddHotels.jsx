import { Form } from "react-bootstrap";
import { useState } from "react";
import { addHotel } from "../../API/Hotel.js";
const AddHotels = () => {
  const [hotel, setHotel] = useState({});
  //   hotelName: "",
  //   hotelAddress: "",
  //   hotelCity: "",
  //   photos: [],
  //   hotelPhoneNumber: "",
  //   hotelEmail: "",
  //   hotelRating: "",
  //   hotelDescription: "",
  //   amenities: [],
  // });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setHotel({
      ...hotel,
      [name]: value,
    });
  };
  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      setHotel({
        ...hotel,
        [name]: [...hotel[name], e.target.value],
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(hotel);
    addHotel(hotel);
  };
  return (
    <div className="container">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="hotelName">
          <Form.Label>Hotel Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Hotel Name"
            name="hotelName"
            onChange={handleChange}
            value={hotel.name}
          />
        </Form.Group>
        <Form.Group controlId="hotelAddress">
          <Form.Label>Hotel Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Hotel Address"
            name="hotelAddress"
            onChange={handleChange}
            value={hotel.address}
          />
        </Form.Group>
        <Form.Group controlId="hotelCity">
          <Form.Label>Hotel City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Hotel City"
            name="hotelCity"
            onChange={handleChange}
            value={hotel.city}
          />
        </Form.Group>
      
        <Form.Group controlId="hotelPhoneNumber">
          <Form.Label>Hotel Phone Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Hotel Phone Number"
            name="hotelPhoneNumber"
            onChange={handleChange}
            value={hotel.phoneNumber}
          />
        </Form.Group>
        <Form.Group controlId="hotelEmail">
          <Form.Label>Hotel Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Hotel Email"
            name="hotelEmail"
            onChange={handleChange}
            value={hotel.email}
          />
        </Form.Group>
        <Form.Group controlId="hotelRating">
          <Form.Label>Hotel Rating</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Hotel Rating"
            name="hotelRating"
            onChange={handleChange}
            value={hotel.rating}
          />
        </Form.Group>
        <Form.Group controlId="hotelDescription">
          <Form.Label>Hotel Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Hotel Description"
            name="hotelDescription"
            onChange={handleChange}
            value={hotel.description}
          />
        </Form.Group>
        {/* <Form.Group controlId="formBasicEmail">
                    <Form.Label>Hotel Amenities</Form.Label>
                    <Form.Control type="text" placeholder="Enter Hotel Amenities" name="amenities" onChange={handleChange} value={hotel.amenities}/>
                </Form.Group> */}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Hotel Photos</Form.Label>
          <Form.Control
            type="file"
            accept="image/png, image/jpeg"
            multiple
            placeholder="Upload Hotel Photos"
            name="photos"
            onChange={handleChange}
            value={hotel.photos}
          />
        </Form.Group>
        <Form.Group controlId="amenities">
          <Form.Check
            type="checkbox"
            name="amenities"
            label="Free Wifi"
            onChange={handleCheckbox}
            value="Free Wifi"
          />
          <Form.Check
            type="checkbox"
            name="amenities"
            label="Free Parking"
            onChange={handleCheckbox}
            value="Free Parking"
          />
          <Form.Check
            type="checkbox"
            name="amenities"
            label="Free Breakfast"
            onChange={handleCheckbox}
            value="Free Breakfast"
          />
          <Form.Check
            type="checkbox"
            name="amenities"
            label="Swimming Pool"
            onChange={handleCheckbox}
            value="Swimming Pool"
          />
          <Form.Check
            type="checkbox"
            name="amenities"
            label="Gym"
            onChange={handleCheckbox}
            value="Gym"
          />
          <Form.Check
            type="checkbox"
            name="amenities"
            label="Spa"
            onChange={handleCheckbox}
            value="Spa"
          />
          <Form.Check
            type="checkbox"
            name="amenities"
            label="Restaurant"
            onChange={handleCheckbox}
            value="Restaurant"
          />
          <Form.Check
            type="checkbox"
            name="amenities"
            label="Bar"
            onChange={handleCheckbox}
            value="Bar"
          />
          <Form.Check
            type="checkbox"
            name="amenities"
            label="Laundry"
            onChange={handleCheckbox}
            value="Laundry"
          />
          <Form.Check
            type="checkbox"
            name="amenities"
            label="Airport Shuttle"
            onChange={handleCheckbox}
            value="Airport Shuttle"
          />
        </Form.Group>

        <button
          type="button"
          onClick={handleSubmit}
          className="btn btn-primary"
        >
          Submit
        </button>
      </Form>
    </div>
  );
};

export default AddHotels;
