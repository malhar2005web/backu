import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/v1/auth'; // Replace with your backend URL

export const signup = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/signup`, userData, {
      withCredentials: true, // Include cookies for authentication
    });
    return response.data;
  } catch (error) {
    console.error('Error during signup:', error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const login = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, userData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error during login:', error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/logout`, {}, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error during logout:', error.response?.data || error.message);
    throw error.response?.data || error;
  }
};