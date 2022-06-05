import axios from "axios";

export const addRoom = async (room) => {
  try {
    const result = await axios.post(
      `/api/v1/rooms/hotel/addRoom`,
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
      `/api/v1/rooms/getRooms/${hotelId}?start=${start}&end=${end}`
    );
    return result;
  } catch (error) {
    return error;
  }
};

export const getRoom = async (roomId) => {
  try {
    const result = await axios.get(
      `/api/v1/rooms/getRoom/${roomId}`
    );
    return result;
  } catch (error) {
    return error;
  }
};

export const updateRoom = async (room, id) => {
  try {
    const result = await axios.put(
      `/api/v1/rooms/updateRoom/${id}`,
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
      "/api/v1/deleteRoom/" + roomId
    );
    return result;
  } catch (error) {
    return error;
  }
};
