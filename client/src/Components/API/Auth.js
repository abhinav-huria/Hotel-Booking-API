import axios from "axios";

export const signUp = async (user) => {
  try {
    const result = await axios.post(
      "http://localhost:3003/api/v1/auth/signup",
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
      "http://localhost:3003/api/v1/auth/signin",
      user,
      { withCredentials: true }
    );
    return result;
  } catch (error) {
    return error;
  }
};

export const signOut = async () => {
  try {
    const result = await axios.get(
      "http://localhost:3003/api/v1/auth/signout",
      { withCredentials: true }
    );
    return result;
  } catch (error) {
    return error;
  }
};