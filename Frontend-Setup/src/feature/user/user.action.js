
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { changeUserStatusService, getAllUserService, signupService } from '../../services/signup.service';
import { getAllOwnerType, getAllUsersType, putOwnerStatusType, putUserStatusType } from './user.type';


const authRequest = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});


export const LoginApi = createAsyncThunk('Auth/Login', async (payload, { rejectWithValue }) => {
  try {
    const response = await authRequest.post('/users/login', {
      email: payload.email,
      password: payload.password,
    }
    );
    return response.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const signupUserData = createAsyncThunk('signup/user', async (payload, { rejectWithValue }) => {
  try {
    console.log(payload)
    const response = await authRequest.post('/users', payload);
    return response.data;
  } catch (error) {
    console.log("error", error)
    return rejectWithValue(error);
  }
});

export const getAllUser = createAsyncThunk(getAllUsersType, async ({ pagination, status, type }, { rejectWithValue }) => {
  try {
    if (!status) status = '';
    const response = await getAllUserService(pagination, status, type);
    return response.data;
  } catch (error) {
    console.log("error", error)
    return rejectWithValue(error);
  }
})
export const getAllOwner = createAsyncThunk(getAllOwnerType, async ({ pagination, status, type }, { rejectWithValue }) => {
  try {
    const response = await getAllUserService(pagination, status, type);
    return response.data;
  } catch (error) {
    console.log("error", error)
    return rejectWithValue(error);
  }
})
export const changeUserStatus = createAsyncThunk(putUserStatusType, async (uuid, { rejectWithValue }) => {
  try {
    const response = await changeUserStatusService(uuid);
    return response.data;
  } catch (error) {
    console.log("error", error)
    return rejectWithValue(error);
  }
})
export const changeOwnerStatus = createAsyncThunk(putOwnerStatusType, async (uuid, { rejectWithValue }) => {
  try {
    const response = await changeUserStatusService(uuid);
    return response.data;
  } catch (error) {
    console.log("error", error)
    return rejectWithValue(error);
  }
})

