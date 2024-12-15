import axiosInstance from "../config/axios"
import axiosInstanceImage from "../config/axiosInstance"

export const addRestaurantService = (payload) => axiosInstanceImage.post(`/products`,payload )
export const getAllRestaurantService = (page,limit,search_term) => axiosInstance.get(`/products?page=${page}&limit=${limit}` )
export const getRestaurantService = (uuid) => axiosInstance.get(`/restaurant/${uuid}` )
export const deleteRestaurantService = (id,payload) => axiosInstance.delete(`/products/delete/${id}`, payload )
export const updateRastaurantService = (data,id) => axiosInstanceImage.put(`/products/update/${id}`,data)
