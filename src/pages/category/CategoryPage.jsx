import { useNavigate, useParams } from "react-router";
import Layout from "../../components/layout/Layout";
import { useContext, useEffect } from "react";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import { addToWishlist, removeFromWishlist  } from "../../redux/wishlistSlice";
import toast from "react-hot-toast";

const CategoryPage = () => {
    const { categoryname } = useParams();
    const context = useContext(myContext);
    const { getAllProduct, loading } = context;
    const navigate = useNavigate();

    const filterProduct = getAllProduct.filter((obj) => obj.category.includes(categoryname));

    const cartItems = useSelector((state) => state.cart);
    const wishlistItems = useSelector((state) => state.wishlist);
    const dispatch = useDispatch();

    const addCart = (item) => {
        dispatch(addToCart(item));
        toast.success("Added to cart");
    };

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success("Removed from cart");
    };

    const addToWish = (item) => {
        dispatch(addToWishlist(item));
        toast.success("Added to wishlist");
    };

    const removeFromWish = (item) => {
        dispatch(removeFromWishlist(item));
        toast.success("Removed from wishlist");
    };

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <Layout>
            <div className="mt-10">
                <div>
                    <h1 className="text-center mb-5 text-2xl font-semibold first-letter:uppercase">{categoryname}</h1>
                </div>

                {loading ? (
                    <div className="flex justify-center">
                        <Loader />
                    </div>
                ) : (
                    <section className="text-gray-600 body-font">
                        <div className="container px-5 py-5 mx-auto">
                            <div className="flex flex-wrap -m-4 justify-center">
                                {filterProduct.length > 0 ? (
                                    <>
                                        {filterProduct.map((item, index) => {
                                            const { id, title, price, productImageUrl } = item;
                                            const inCart = cartItems.some((p) => p.id === item.id);
                                            const inWishlist = wishlistItems.some((p) => p.id === item.id);

                                            return (
                                                <div key={index} className="p-4 w-1/2 md:w-1/3 sm:w-1/3 lg:w-1/5">
                                                    <div
                                                        className="lg:h-[55vh] lg:w-[17vw] sm:w-[19vw] sm:h-[60vh] border transition-all hover:bg-[#A4BEF9] bg-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer"
                                                    >
                                                        <img
                                                            onClick={() => navigate(`/productinfo/${id}`)}
                                                            className="sm:h-[25vh] sm:w-[19vw] md:w-[19vw] h-[25vh] w-[50vw]"
                                                            src={productImageUrl}
                                                            alt="img"
                                                        />
                                                        <div className="p-6">
                                                            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                                                                MeDiMart
                                                            </h2>
                                                            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                                                {title.substring(0, 17)}
                                                            </h1>
                                                            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                                                ₹{price}
                                                            </h1>
                                                            <div className="flex justify-center mb-2">
                                                                {inCart ? (
                                                                    <button
                                                                        onClick={() => deleteCart(item)}
                                                                        className="bg-[#003bfc] hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold"
                                                                    >
                                                                        Remove from Cart
                                                                    </button>
                                                                ) : (
                                                                    <button
                                                                        onClick={() => addCart(item)}
                                                                        className="bg-[#0087FC] hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold"
                                                                    >
                                                                        Add to Cart
                                                                    </button>
                                                                )}
                                                            </div>
                                                            <div className="flex justify-between items-center">
                                                                <button
                                                                    onClick={() => (inWishlist ? removeFromWish(item) : addToWish(item))}
                                                                    className={`w-full text-white py-[4px] rounded-lg font-bold ${inWishlist ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
                                                                >
                                                                    {inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </>
                                ) : (
                                    <div>
                                        <div className="flex justify-center">
                                            <img className="mb-2" src="https://cdn-icons-png.flaticon.com/128/2748/2748614.png" alt="No products" />
                                        </div>
                                        <h1 className="text-black text-xl">No {categoryname} product found</h1>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                )}
            </div>
        </Layout>
    );
};

export default CategoryPage;
