import axios from 'axios';

export const getHotels = async () => {
    const result = await axios("/api/getHotels");
  
    return result;
  };