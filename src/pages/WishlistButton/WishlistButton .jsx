import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToWishlist, removeFromWishlist } from './wishlistSlice'

const WishlistButton = ({ item }) => {
    const dispatch = useDispatch()
    const wishlist = useSelector(state => state.wishlist)
    const isInWishlist = wishlist.some(wishlistItem => wishlistItem.id === item.id)

    const handleWishlistToggle = () => {
        if (isInWishlist) {
            dispatch(removeFromWishlist(item))
        } else {
            dispatch(addToWishlist(item))
        }
    }

    return (
        <button onClick={handleWishlistToggle}>
            {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
        </button>
    )
}

export default WishlistButton
