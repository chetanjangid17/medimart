import { createSlice } from '@reduxjs/toolkit'

const initialWishlistState = JSON.parse(localStorage.getItem('wishlist')) ?? [];

export const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: initialWishlistState,
    reducers: {
        addToWishlist(state, action) {
            state.push(action.payload);
        },
        removeFromWishlist(state, action) {
            return state.filter(item => item.id !== action.payload.id);
        },
    },
})

// Action creators are generated for each case reducer function
export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions

export default wishlistSlice.reducer
