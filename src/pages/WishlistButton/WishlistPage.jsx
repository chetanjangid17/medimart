import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from '../../redux/wishlistSlice';
import { addToCart, deleteFromCart} from '../../redux/cartSlice';
import { Link } from 'react-router-dom';
import Layout from '../../components/layout/Layout';

const WishlistPage = () => {
    const wishlist = useSelector(state => state.wishlist);
    const cartItems = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const handleRemoveFromWishlist = (item) => {
        dispatch(removeFromWishlist(item));
    };

    const handleAddToCart = (item) => {
        dispatch(addToCart(item));
    };

    const handleRemoveFromCart = (item) => {
        dispatch(deleteFromCart(item));
    };

    const isInCart = (item) => {
        return cartItems.some(cartItem => cartItem.id === item.id);
    };

    return (
        <Layout>

        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>
            {wishlist.length > 0 ? (
                <div className="flex flex-wrap -m-4">
                    {wishlist.map((item, index) => (
                        <div key={index} className="p-4 w-1/2 md:w-1/3 sm:w-1/3 lg:w-1/5">
                            <div className="lg:h-[60vh] lg:w-[17vw] sm:w-[19vw] sm:h-[60vh] border transition-all hover:bg-[#A4BEF9] bg-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer hover">
                                <img className="sm:h-[25vh] sm:w-[19vw] md:w-[19vw] h-[25vh] w-[50vw]" src={item.productImageUrl} alt="img" />
                                <div className="p-6">
                                    <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">MeDiMart</h2>
                                    <h1 className="title-font text-sx font-medium text-gray-900 mb-3">{item.title.substring(0, 17)}</h1>
                                    <h1 className="title-font text-lg font-medium text-gray-900 mb-3">₹{item.price}</h1>
                                    <div className="flex justify-center mb-2">
                                        {isInCart(item) ? (
                                            <button onClick={() => handleRemoveFromCart(item)} className="bg-red-500 xs:text-xs text-white  rounded-md hover:bg-red-600">Remove from Cart</button>
                                        ) : (
                                            <button onClick={() => handleAddToCart(item)} className="bg-green-500 text-white xs:text-xs rounded-md hover:bg-green-600">Add to Cart</button>
                                        )}
                                        <button onClick={() => handleRemoveFromWishlist(item)} className="ml-2 bg-red-500 text-white xs:text-xs rounded-md hover:bg-red-600">Remove from Wishlist</button>
                                    </div>
                                    <div className="flex justify-center items-center">
                                        <Link to={`/productinfo/${item.id}`} className="text-blue-500 hover:underline">View Details</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-700">Your wishlist is empty.</p>
            )}
        </div>
        </Layout>
    );
};

export default WishlistPage;
