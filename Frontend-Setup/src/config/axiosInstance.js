
import axios from "axios";
const token = localStorage.getItem('token');

const axiosInstanceImage = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    withCredentials: true, 
    headers: {
      "Content-Type": 'multipart/form-data',
      "Authorization": token 
    }
  
  });
  export default axiosInstanceImage