import { createSlice } from "@reduxjs/toolkit";
import { deleteRestaurantAction, getAllRestaurantAction, getRestaurantAction, postRestaurantAction, updateRestaurantAction } from "./restaurant.action";


const initialState  = {
    restaurant: [],
    allRestaurant: [],
    loading: false,
    message: "",
    type: "",
    count: 0
}

const restaurantSlice = createSlice({
    name: 'Restaurant',
    initialState,
    reducers: {
        clearRestaurantState: () => initialState
    },
    extraReducers: (builder) => {
        builder.addCase(postRestaurantAction.fulfilled, (state, action) => {
            if (!Array.isArray(state?.restaurant) || !Array.isArray(state?.allRestaurant)) {
                state.restaurant = [];
                state.allRestaurant = [];
            }
            state.restaurant.unshift(action);
            console.log('action?.payload: ', action?.payload);
            state.count=action?.payload?.total
            console.log('state.count: ', state.count);

            state.allRestaurant = [action?.payload, ...state?.allRestaurant];
        })
            .addCase(postRestaurantAction.pending, (state) => {
                state.loading = true;
                
            })
            .addCase(postRestaurantAction.rejected, (state, action) => {
                state.message = "Server is not responding";
                state.type = "error";
                state.loading = false;

            })
        builder.addCase(getRestaurantAction.fulfilled, (state, action) => {
            console.log(action)
            state.loading = false;
            state.allRestaurant = action?.payload;
            state.count = action?.payload?.total
            console.log('action?.payload: ', action);


        })
            .addCase(getRestaurantAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(getRestaurantAction.rejected, (state, action) => {
                state.loading = false;
                state.message = "Server is not responding";
                state.type = "error";
            })

        builder.addCase(getAllRestaurantAction.fulfilled, (state, action) => {

            state.getallLeaveLoading = false;
            state.count = action?.payload?.count;
            state.allRestaurant = action?.payload.data;

        })
            .addCase(getAllRestaurantAction.pending, (state) => {
                state.getallLeaveLoading = true;
            })
            .addCase(getAllRestaurantAction.rejected, (state, action) => {
                state.getallLeaveLoading = false;
                state.message = "Server is not responding";
                state.type = "error";
            })
        builder.addCase(updateRestaurantAction.fulfilled, (state, action) => {
            state.loading = false;
            state.restaurant = action?.payload;
            const index = state?.allRestaurant?.findIndex((leaveType ) => leaveType?.id === action?.payload?.id);
            if (index !== -1) {
                state.allRestaurant[index] = action?.payload;
            } else {
                state.allRestaurant = [action?.payload, ...state.allRestaurant];
            }
        })
            .addCase(updateRestaurantAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateRestaurantAction.rejected, (state, action) => {
                state.loading = false;
                state.message = "Server is not responding";
                state.type = "error";
            })

        builder.addCase(deleteRestaurantAction.fulfilled, (state, action) => {
            state.loading = false;
        
            state.restaurant = Array.isArray(state.restaurant)
                ? state.restaurant.filter((leaveType) => leaveType.uuid !== action.payload)
                : [];
        
            state.allRestaurant = Array.isArray(state.allRestaurant)
                ? state.allRestaurant.filter((leaveType) => leaveType.uuid !== action.payload)
                : [];
        
            state.message = "Item successfully deleted";
        })
        
            .addCase(deleteRestaurantAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteRestaurantAction.rejected, (state, action) => {
                state.loading = false;
                state.message = "Server is not responding";
                state.type = "error";
            })
    },
})

export default restaurantSlice.reducer;
export const {clearRestaurantState} = restaurantSlice.actions