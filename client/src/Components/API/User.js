import axios from "axios";

export const getUsers = async () => {
  try {
    const result = await axios.get("/api/v1/users/");
    return result;
  } catch (error) {
    return error;
  }
}

export const getUser = async (userId) => {
    try {
        const result = await axios.get(`/api/v1/users/${userId}`, {withCredentials: true});
        return result;
    } catch (error) {
        return error;
    }
    }

    export const updateUser = async (user, id) => {
        try {
            const result = await axios.put(`/api/v1/users/updateUser/${id}`, user);
            return result;
        } catch (error) {
            return error;
        }
    }

    export const deleteUser = async (userId) => {
        try {
            const result = await axios.delete(`/api/v1/users/deleteUser/${userId}`);
            return result;
        } catch (error) {
            return error;
        }
    }

    export const submitDispute = async (dispute, userId) => {
        try {
            const result = await axios.post(`/api/v1/users/dispute/${userId}`, dispute,{withCredentials: true});
            return result;
        } catch (error) {
            return error;
        }
    }