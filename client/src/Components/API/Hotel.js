import axios from "axios";

export const getHotels = async () => {
  const result = await axios.get("http://localhost:3003/api/v1/hotels/");

  return result;
};

export const getHotel = async (id) => {
  const result = await axios.get(`http://localhost:3003/api/v1/${id}`);

  return result;
};

export const addHotel = async (hotel) => {
  const result = await axios.post("http://localhost:3003/api/v1/addhotel", {
    hotelName: hotel.hotelName,
    hotelCity: hotel.hotelCity,
    hotelAddress: hotel.hotelAddress,
    hotelPhoneNumber: hotel.hotelPhoneNumber,
    hotelEmail: hotel.hotelEmail,
    photos: hotel.photos,
    hotelDescription: hotel.hotelDescription,
    hotelAmenities: hotel.hotelAmenities,
  });

  return result;
};

export const updateHotel = async (hotel, id) => {
  const result = await axios.put(`http://localhost:3003/api/v1/update/${id}`, {
   hotel
  });

  return result;
};

export const deleteHotel = async (id) => {
  const result = await axios.delete(
    `http://localhost:3003/api/v1/delete/${id}`
  );

  return result;
};

export const getHotelByCity = async (city) => {
  const result = await axios.get(`http://localhost:3003/api/v1/city/${city}`);

  return result;
};

export const getAvailableCities = async () => {
  const result = await axios.get(
    `http://localhost:3003/api/v1/availableCities/c`
  );

  return result;
};

// export const getHotelByName = async (name) => {
//     const result = await axios.get(`http://localhost:3003/api/v1/name/${name}`);

//     return result;
//     }
