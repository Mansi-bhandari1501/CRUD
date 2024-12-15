import axios from "axios";
const token = localStorage.getItem('token');

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
    "Authorization": token 
  }
});


export default axiosInstance;

