import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteRestaurant, getAllRestaurant, getRestaurant, postRestaurant, updateRestaurant } from "./restaurant.type";
import { addRestaurantService, deleteRestaurantService, getAllRestaurantService, getRestaurantService, updateRastaurantService } from "../../services/restaurant.service";

export const postRestaurantAction = createAsyncThunk(postRestaurant, async (payload,{rejectWithValue}) => {
    console.log('payload: ', payload);
    try {
        const response = await addRestaurantService(payload);
        console.log('response: ', response);
  
        return response.data;
    } catch (error) {
        return rejectWithValue(error)
    }
});

export const getRestaurantAction = createAsyncThunk(getRestaurant, async () => {
    try {
        const response = await getRestaurantService();
        return response.data;
    } catch (error) {
        throw error;
    }
})

export const getAllRestaurantAction = createAsyncThunk(getAllRestaurant, async ({pagination,search_term},{rejectWithValue}) => {
    try {
        const {page, limit} = pagination;
        if(!search_term) search_term = "";
        const response = await getAllRestaurantService(page,limit,search_term);
        console.log("response.data",response.data)
        return response.data;
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const updateRestaurantAction = createAsyncThunk(updateRestaurant, async ({data, id},{rejectWithValue}) => {   
 console.log("updateRestaurantAction",id)
    try {
        const response = await updateRastaurantService(data, id);
        return response.data;
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const deleteRestaurantAction = createAsyncThunk(deleteRestaurant, async (id,{rejectWithValue}) => {
    try {
        const payload = {
            "is_active": false
        }
        const response = await deleteRestaurantService(id,payload);
        return (response.data, id);
    } catch (error) {
        return rejectWithValue(error)
    }
})