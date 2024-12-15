
import { createSlice } from "@reduxjs/toolkit";
import { changeOwnerStatus, changeUserStatus, getAllOwner, getAllUser, LoginApi, updateUserAction } from "./user.action";

const initialState = {
  token: '',
  error: false,
  user: null,
  allUsers: [],
  allOwners: [],
  isLoading: false,
  isLogedin: false
};

const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoading = false;
      state.isLogedin = false;
      state.error = false;
      state.token = '';
      state.user = null;
    },
    reset: (state) => {
      state.isLoading = false;
      state.isLogedin = false;
      state.error = false;
      state.token = '';
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(LoginApi.fulfilled, (state, action) => {
      console.log(action.payload,"<-------state------>")
        state.token = action.payload?.token || ''
        localStorage.setItem('token', state.token);
        state.user = action.payload ;
        state.isLoading = false
        state.isLogedin = true
        state.error = false
    })
    builder.addCase(LoginApi.pending, (state, action) => {
        state.isLoading = true
        state.isLogedin = false
        state.error = false
    })
    builder.addCase(LoginApi.rejected, (state, action) => {
        state.isLoading = false
        state.isLogedin = false
        state.error = true
    })
    builder.addCase(getAllUser.fulfilled, (state, action) => {
       state.isLoading = false;
        state.allUsers = action.payload;
    })
    builder.addCase(getAllUser.pending, (state, action) => {
        state.isLoading = true
        state.isLogedin = false
        state.error = false
    })
    builder.addCase(getAllUser.rejected, (state, action) => {
        state.isLoading = false
        state.isLogedin = false
        state.error = true
    })
    builder.addCase(getAllOwner.fulfilled, (state, action) => {
       state.isLoading = false;
        state.allOwners = action.payload;
    })
    builder.addCase(getAllOwner.pending, (state, action) => {
        state.isLoading = true
        state.isLogedin = false
        state.error = false
    })
    builder.addCase(getAllOwner.rejected, (state, action) => {
        state.isLoading = false
        state.isLogedin = false
        state.error = true
    })
    builder.addCase(changeUserStatus.fulfilled, (state, action) => {
       state.isLoading = false;
        state.allUsers = action.payload;
    })
    builder.addCase(changeUserStatus.pending, (state, action) => {
        state.isLoading = true
        state.isLogedin = false
        state.error = false
    })
    builder.addCase(changeUserStatus.rejected, (state, action) => {
        state.isLoading = false
        state.isLogedin = false
        state.error = true
    })
    builder.addCase(changeOwnerStatus.fulfilled, (state, action) => {
       state.isLoading = false;
        state.allOwners = action.payload;
    })
    builder.addCase(changeOwnerStatus.pending, (state, action) => {
        state.isLoading = true
        state.isLogedin = false
        state.error = false
    })
    builder.addCase(changeOwnerStatus.rejected, (state, action) => {
        state.isLoading = false
        state.isLogedin = false
        state.error = true
    })
    // builder.addCase(updateUserAction.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     state.user = action.payload;
       
    // })
    //     .addCase(updateUserAction.pending, (state) => {
    //         state.isLoading = true;
    //     })
    //     .addCase(updateUserAction.rejected, (state, action) => {
    //         state.isLoading = false;
    //     })
}

  
});

export const { logout, reset } = UserSlice.actions;
export default UserSlice.reducer;
