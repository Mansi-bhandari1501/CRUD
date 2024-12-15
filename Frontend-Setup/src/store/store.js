
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist'; 
import UserSlice from '../feature/user/user.slice';
import restaurantSlice from '../feature/restaurant/restaurant.slice';
import storage from 'redux-persist/lib/storage';

const userPersistConfig = {
  key: 'user',
  version: 1,
  storage
};

const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, UserSlice), 
  restaurant: restaurantSlice
});

const store = configureStore({
  reducer: rootReducer, 
});

export const persistor = persistStore(store);

export default store;