import axios from "axios";

export const getUsers = async () => {
  try {
    const result = await axios.get("http://localhost:3003/api/v1/users/");
    return result;
  } catch (error) {
    return error;
  }
}

export const getUser = async (userId) => {
    try {
        const result = await axios.get(`http://localhost:3003/api/v1/users/${userId}`);
        return result;
    } catch (error) {
        return error;
    }
    }

    export const updateUser = async (user, id) => {
        try {
            const result = await axios.put(`http://localhost:3003/api/v1/users/updateUser/${id}`, user);
            return result;
        } catch (error) {
            return error;
        }
    }

    export const deleteUser = async (userId) => {
        try {
            const result = await axios.delete(`http://localhost:3003/api/v1/users/deleteUser/${userId}`);
            return result;
        } catch (error) {
            return error;
        }
    }

    