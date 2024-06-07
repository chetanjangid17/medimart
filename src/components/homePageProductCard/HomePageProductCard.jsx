import { useNavigate } from "react-router";
import myContext from "../../context/myContext";
import { useContext, useEffect } from "react";
import Loader from "../loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import { addToWishlist, removeFromWishlist } from "../../redux/wishlistSlice";
import toast from "react-hot-toast";

const HomePageProductCard = () => {
  const navigate = useNavigate();

  const context = useContext(myContext);
  const { loading, getAllProduct } = context;

  const cartItems = useSelector((state) => state.cart);
  const wishlistItems = useSelector((state) => state.wishlist);

  const dispatch = useDispatch();

  // add to cart function
  const addCart = (item) => {
    dispatch(addToCart(item));
    toast.success("Added to cart");
  };

  // delete from cart function
  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Deleted from cart");
  };

  // add to wishlist function
  const addWishlist = (item) => {
    dispatch(addToWishlist(item));
    toast.success("Added to wishlist");
  };

  // remove from wishlist function
  const removeWishlist = (item) => {
    dispatch(removeFromWishlist(item));
    toast.success("Removed from wishlist");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
  }, [cartItems, wishlistItems]);

  return (
    <div className="mt-5">
      {/* Heading  */}
      <div className="">
        <h1 className=" text-center mb-5 text-2xl font-semibold">
          Bestselling Medicines{" "}
        </h1>
      </div>

      {/* main 1 */}
      <section className="text-gray-600 body-font">
        {/* main 2 */}
        <div className="container px-5 py-5 mx-auto">
          <div className="flex justify-center">{loading && <Loader />}</div>
          {/* main 3  */}
          <div className="flex flex-wrap -m-4 ">
            {getAllProduct.slice(0, 10).map((item, index) => {
              const { id, title, price, productImageUrl } = item;
              return (
                <div key={index} className="p-4 w-1/2 md:w-1/3 sm:w-1/3 lg:w-1/5">
                  <div
                    className="lg:h-[55vh] lg:w-[17vw] sm:w-[19vw] sm:h-[60vh] border transition-all hover:bg-[#A4BEF9] bg-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer hover"
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
                      <h1 className="title-font text-sx font-medium text-gray-900 mb-3">
                        {title.substring(0, 17)}
                      </h1>
                      <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                        ₹{price}
                      </h1>

                      <div className="flex justify-center mb-2">
                        {cartItems.some((p) => p.id === item.id) ? (
                          <button
                            onClick={() => deleteCart(item)}
                            className="bg-[#003bfc] hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold"
                          >
                            Delete From Cart
                          </button>
                        ) : (
                          <button
                            onClick={() => addCart(item)}
                            className="bg-[#0087FC] hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold"
                          >
                            Add To Cart
                          </button>
                        )}
                      </div>

                      <div className="flex justify-center">
                        {wishlistItems.some((p) => p.id === item.id) ? (
                          <button
                            onClick={() => removeWishlist(item)}
                            className="bg-red-500 hover:bg-red-600 w-full text-white py-[4px] rounded-lg font-bold"
                          >
                            Remove From Wishlist
                          </button>
                        ) : (
                          <button
                            onClick={() => addWishlist(item)}
                            className="bg-green-500 hover:bg-green-600 w-full text-white py-[4px] rounded-lg font-bold"
                          >
                            Add To Wishlist
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePageProductCard;
