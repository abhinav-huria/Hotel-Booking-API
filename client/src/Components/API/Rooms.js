import axios from "axios";

export const addRoom = async (room, hotelId) => {
  try {
    const result = await axios.post(
      `http://localhost:3003/api/v1/rooms/addRoom/${hotelId}`,
      room,
      { withCredentials: true }
    );
    return result;
  } catch (error) {
    return error;
  }
};

export const getRoomsByHotel = async (hotelId, start,end) => {
  try {
    const result = await axios.get(
      `http://localhost:3003/api/v1/rooms/getRooms/${hotelId}?start=${start}&end=${end}`
    );
    return result;
  } catch (error) {
    return error;
  }
};

export const getRoom = async (roomId) => {
  try {
    const result = await axios.get(
      `http://localhost:3003/api/v1/rooms/getRoom/${roomId}`
    );
    return result;
  } catch (error) {
    return error;
  }
};

export const updateRoom = async (room, id) => {
  try {
    const result = await axios.put(
      `http://localhost:3003/api/v1/rooms/updateRoom/${id}`,
      room
    );
    return result;
  } catch (error) {
    return error;
  }
};

export const deleteRoom = async (roomId) => {
  try {
    const result = await axios.delete(
      "http://localhost:3003/api/v1/deleteRoom/" + roomId
    );
    return result;
  } catch (error) {
    return error;
  }
};

export const roomAvailability = async (roomId) => {
  try {
    const result = await axios.put(
      `http://localhost:3003/api/v1/rooms/roomAvailability/${roomId}`
    );
    return result;
  } catch (error) {
    return error;
  }
};
