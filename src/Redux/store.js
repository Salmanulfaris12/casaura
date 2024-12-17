import {configureStore} from '@reduxjs/toolkit';
import wishlistReducer from './Slices/WishListSlice'
import addressReducer from './Slices/AddressSlice'

const store = configureStore({
    reducer:{
        wishlist:wishlistReducer,
        address:addressReducer
    }
})
export default store;