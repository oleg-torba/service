import axios from "axios";

export const Fetch = async (query) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/search/${query}`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};
