import axiosInstance from "../config/axios";

export const signupService = (payload) => axiosInstance.post(`/users`,{...payload} )
export const getAllUserService = (pagination,status,type) => axiosInstance.get(`/users?type=${type}&is_active=${status}&page=${pagination.page}&limit=${pagination.limit}` )
export const changeUserStatusService = (uuid) => axiosInstance.put(`/users/${uuid}` )
export const loginService = (payload) => axiosInstance.post(`/users/login`,{...payload} )
