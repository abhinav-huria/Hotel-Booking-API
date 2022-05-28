import axios from "axios";

export const getHotels = async () => {
  const result = await axios.get("http://localhost:3003/api/v1/hotels/");

  return result;
};

export const getHotel = async (id) => {
  const result = await axios.get(`http://localhost:3003/api/v1/hotels/${id}`);

  return result;
};

export const addHotel = async (hotel) => {
  const result = await axios.post("http://localhost:3003/api/v1/hotels/addhotel", {
   hotel
  });

  return result;
};

export const updateHotel = async (hotel, id) => {
  const result = await axios.put(`http://localhost:3003/api/v1/hotels/update/${id}`, {
   hotel
  });

  return result;
};

export const deleteHotel = async (id) => {
  const result = await axios.delete(
    `http://localhost:3003/api/v1/hotels/delete/${id}`
  );

  return result;
};

export const getHotelByCity = async (city) => {
  const result = await axios.get(`http://localhost:3003/api/v1/hotels/city/${city}`);

  return result;
};

export const getAvailableCities = async () => {
  const result = await axios.get(
    `http://localhost:3003/api/v1/hotels/availableCities/c`
  );

  return result;
};

// export const getHotelByName = async (name) => {
//     const result = await axios.get(`http://localhost:3003/api/v1/name/${name}`);

//     return result;
//     }
