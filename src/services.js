import axios from 'axios';

const BASE_URL = 'https://api.spacexdata.com/v3/launches';
const limit = 10;

export const fetchLaunches = async (page) => {
  try {
    const response = await axios.get(
      `${BASE_URL}?limit=${limit}&offset=${page * limit}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching launches:', error);
    throw error;
  }
};
