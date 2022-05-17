import axios from "axios";

export const signUp = async (user) => {
  try {
    const result = await axios.post(
      "http://localhost:3003/api/v1/signup",
      user
    );
    return result;
  } catch (error) {
    return error;
  }
};

export const signIn = async (user) => {
  try {
    const result = await axios.post(
      "http://localhost:3003/api/v1/signin",
      user,
      { withCredentials: true }
    );
    return result;
  } catch (error) {
    return error;
  }
};