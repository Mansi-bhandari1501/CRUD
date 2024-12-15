import axios from "axios";
import { useSelector } from "react-redux";
const token = localStorage.getItem('token');
// const token = useSelector((state) => state?.user?.token);
console.log(token,"--------TOKEN---------")
export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
    "Authorization": token 
  }
});


export default axiosInstance;

