import React, {useState} from "react";
import { Form } from "react-bootstrap";
import {useLocation} from "react-router-dom";
import {addRoom} from "../../API/Rooms.js";

const AddRoom = () => {
    const location = useLocation();
    const hotelId = location.pathname.split("/")[2];
    const [status, setStatus] = useState("");
    const [room, setRoom] = useState({
        name: "",
        description: "",
        pricePerNight: "",
        guestCapacity: "",
        bedType: "",
        numberOfRooms: "",
        amenities: [],
        hotelId: hotelId,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoom({
          ...room,
          [name]: value,
        });
      };
      const handleCheckbox = (e) => {
        const { name, checked } = e.target;
        if (checked) {
          setRoom({
            ...room,
            [name]: [...room[name], e.target.value],
          });
        }
      };
const handleSubmit = (e) => {
    e.preventDefault();
    addRoom(room,hotelId).then((res) => {
        console.log(res);
        setStatus("success");
    }).catch
    (err => {
      console.log("error");
    });
    // console.log(room);
};

const addAnotherRoom = (e) => {
    e.preventDefault();
    window.location.reload();
};
    return (
        <>
            <div className="container">
            {status === "success" ? (
                <div className="alert alert-success">
                    Room added successfully
                    <button className="btn btn-success" onClick={addAnotherRoom}>Add another    </button> 
                    </div>) : null}
                <Form>
                <Form.Group controlId="hotelId">
                    <Form.Label>Hotel Id</Form.Label>
                    <Form.Control
                    type="text"
                    placeholder="Enter Hotel Id"
                    name="hotelId"
                    onChange={handleChange}
                    value={hotelId}
                    disabled
                    />
                </Form.Group>
                    <Form.Group controlId="roomName">
                        <Form.Label>Room Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Room Name" name="name" onChange={handleChange} value={room.name}/>
                    </Form.Group>
                    <Form.Group controlId="roomDesc">
                        <Form.Label>Room Description</Form.Label>
                        <Form.Control type="text" placeholder="Enter Room Description" name="description" onChange={handleChange} value={room.description}/>
                    </Form.Group>
                    <Form.Group controlId="roomPrice">
                        <Form.Label>Room Price(per night)</Form.Label>
                        <Form.Control type="number" placeholder="Enter Room Price" name="pricePerNight" onChange={handleChange} value={room.pricePerNight}/>
                    </Form.Group>
                    <Form.Group controlId="roomCapacity">
                        <Form.Label>Room Capacity</Form.Label>
                        <Form.Control type="number" placeholder="Enter Room Capacity" name="guestCapacity" onChange={handleChange} value={room.guestCapacity}/>
                    </Form.Group>
                    <Form.Group controlId="roomNumber">
                        <Form.Label>Number of rooms</Form.Label>
                        <Form.Control type="number" placeholder="Enter number of rooms" name="numberOfRooms" onChange={handleChange} value={room.numberOfRooms}/>
                    </Form.Group>
                    <Form.Group controlId="roomBedType">
                        <Form.Label>Bed Type</Form.Label>
                        <Form.Control type="text" placeholder="Enter bed type" name="bedType" onChange={handleChange} value={room.bedType}/>
                    </Form.Group>
                    <Form.Group controlId="amenities">
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
            label="Air Conditioning"
            onChange={handleCheckbox}
            value="Air Conditioning"
          />
          <Form.Check
            type="checkbox"
            name="amenities"
            label="TV"
            onChange={handleCheckbox}
            value="TV"
          />
          <Form.Check
            type="checkbox"
            name="amenities"
            label="Pool View"
            onChange={handleCheckbox}
            value="Pool View"
          />
          <Form.Check
            type="checkbox"
            name="amenities"
            label="Mini Bar"
            onChange={handleCheckbox}
            value="Mini Bar"
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
        </>
    )
}


export default AddRoom;