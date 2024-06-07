import { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import MyContext from "../../context/myContext";
import { useParams, useNavigate } from "react-router";
import { fireDB } from "../../firebase/FirebaseConfig";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";
import StarRatings from "react-star-ratings";

const ProductInfo = () => {
  const context = useContext(MyContext);
  const {
    loading,
    setLoading,
    getFeedbackForProduct,
    addFeedback,
    allFeedback,
  } = context;

  const [product, setProduct] = useState("");
  const [feedbackContent, setFeedbackContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userMap, setUserMap] = useState({});
  const [averageRating, setAverageRating] = useState(0);
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  const { id } = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const getProductData = async () => {
    setLoading(true);
    try {
      const productTemp = await getDoc(doc(fireDB, "products", id));
      const productData = { ...productTemp.data(), id: productTemp.id };
      setProduct(productData);
      getRecommendations(productData.category);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getUserData = async () => {
    try {
      const usersSnapshot = await getDocs(collection(fireDB, "users"));
      const users = {};
      usersSnapshot.forEach((doc) => {
        users[doc.id] = doc.data();
      });
      setUserMap(users);
    } catch (error) {
      console.error("Error getting users:", error);
    }
  };

  const getRecommendations = async (category) => {
    try {
      const q = query(
        collection(fireDB, "products"),
        where("category", "==", category)
      );
      const querySnapshot = await getDocs(q);
      const recommendations = [];
      querySnapshot.forEach((doc) => {
        if (doc.id !== id) {
          // Exclude the current product
          recommendations.push({ ...doc.data(), id: doc.id });
        }
      });
      setRecommendedProducts(recommendations);
    } catch (error) {
      console.error("Error getting recommendations:", error);
    }
  };

  const calculateAverageRating = (feedbackArray) => {
    if (feedbackArray.length === 0) return 0;
    const totalRating = feedbackArray.reduce(
      (acc, feedback) => acc + feedback.content.rating,
      0
    );
    return totalRating / feedbackArray.length;
  };

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const user = JSON.parse(localStorage.getItem("users"));
      if (!user) {
        navigate("/login");
        return;
      }

      await addFeedback(id, { text: feedbackContent, rating: 5 }); // Replace 5 with the actual rating value from your form
      toast.success("Feedback submitted successfully");
      setFeedbackContent("");
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
    setIsSubmitting(false);
  };

  const toggleCartAction = () => {
    if (cartItems.some((p) => p.id === product.id)) {
      dispatch(deleteFromCart(product));
      toast.success("Removed from cart");
    } else {
      dispatch(addToCart(product));
      toast.success("Added to cart");
    }
  };

  const navigateToProduct = (productId) => {
    navigate(`/productinfo/${productId}`);
  };

  useEffect(() => {
    getProductData();
    getFeedbackForProduct(id);
    getUserData();
  }, [id]); // Adding id as a dependency to refetch when id changes

  useEffect(() => {
    setAverageRating(calculateAverageRating(allFeedback));
  }, [allFeedback]);

  return (
    <Layout>
      <section className="py-5 lg:py-16 font-poppins dark:bg-wheat">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            <div className="max-w-5xl mx-auto h-full border items-center  rounded-3xl">
              <div className="flex flex-wrap">
                <div className="w-full mb-8 md:w-1/2 md:mb-0">
                  <div>
                    <img
                      className="w-full lg:h-[39em] rounded-lg"
                      src={product?.productImageUrl}
                      alt=""
                    />
                  </div>
                </div>
                <div className="w-full px-4 md:w-1/2 content-center">
                  <div className="lg:pl-20">
                    <div className="mb-6">
                      <h2 className="max-w-xl  mb-2 text-xl font-semibold leading-loose tracking-wide text-gray-700 md:text-2xl dark:text-gray-800">
                        {product?.title}
                      </h2>
                      <div className="flex flex-wrap items-center mb-2">
                        <p className="inline-block text-2xl font-semibold text-gray-700 dark:text-gray-800">
                          <span>₹ {product?.price}</span>
                        </p>
                      </div>
                      <div className="mb-1 flex">
                        <h2 className="mb-2 text-lg font-bold text-gray-700 dark:text-gray-400">
                          Rating :
                        </h2>
                        <div className="ml-2">
                          <StarRatings
                            rating={averageRating}
                            starDimension="22px"
                            starSpacing="3px"
                            starRatedColor="purple"
                          />
                        </div>
                      </div>
                      <div className="mb-6 ">
                        <h2 className="mb-2 text-lg font-bold text-gray-700 dark:text-gray-400">
                          Description
                          <p className="text-sm text-black">
                            {product?.description}
                          </p>
                        </h2>
                      </div>
                      <div className="mb-6">
                        <button
                          onClick={toggleCartAction}
                          className={`mr-3 px-4 py-2 text-white bg-red-700 bg-${
                            cartItems.some((p) => p.id === product.id)
                              ? "red"
                              : "pink"
                          }-600 rounded-lg hover:bg-${
                            cartItems.some((p) => p.id === product.id)
                              ? "red"
                              : "pink"
                          }-700 focus:outline-none focus:bg-${
                            cartItems.some((p) => p.id === product.id)
                              ? "red"
                              : "pink"
                          }-700`}
                        >
                          {cartItems.some((p) => p.id === product.id)
                            ? "Remove from Cart"
                            : "Add to Cart"}
                        </button>
                      </div>
                      <div className="mb-6">
                        {/* <h2 className="mb-2 text-lg font-bold text-gray-700 dark:text-gray-400">
    Feedback:
  </h2> */}
                        <table className="min-w-[200px] divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              {/* <th
          scope="col"
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          User
        </th> */}
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Feedback
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Rating
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {allFeedback.map((feedback) => (
                              <tr key={feedback.id}>
                                {/* <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">
              {userMap[feedback.userId]?.username || "Anonymous"}
            </div>
          </td> */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">
                                    {feedback.content.text}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">
                                    <StarRatings
                                      rating={feedback.content.rating}
                                      starDimension="20px"
                                      starSpacing="3px"
                                      starRatedColor="purple"
                                    />
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="max-w-5xl mx-auto mt-8">
              <h2 className="text-2xl font-bold mb-4">Recommended Products</h2>
              <div className="flex flex-wrap">
                {recommendedProducts.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 w-1/2 md:w-1/3 sm:w-1/3 lg:w-1/5 cursor-pointer"
                    onClick={() => navigateToProduct(item.id)}
                  >
                    <div className="border rounded-lg p-4">
                      <img
                        src={item.productImageUrl}
                        alt={item.title}
                        className="w-full h-40 object-cover mb-2 rounded"
                      />
                      <h3 className="text-lg font-semibold mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-700 mb-2"> {item.category}</p>
                      <p className="text-gray-700 mb-2">₹ {item.price}</p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent the parent click handler from firing
                          if (cartItems.some((p) => p.id === item.id)) {
                            dispatch(deleteFromCart(item));
                            toast.success("Removed from cart");
                          } else {
                            dispatch(addToCart(item));
                            toast.success("Added to cart");
                          }
                        }}
                        className={`px-4 py-2 text-white bg-${
                          cartItems.some((p) => p.id === item.id)
                            ? "red"
                            : "pink"
                        }-600 rounded-lg hover:bg-${
                          cartItems.some((p) => p.id === item.id)
                            ? "red"
                            : "pink"
                        }-700 focus:outline-none focus:bg-${
                          cartItems.some((p) => p.id === item.id)
                            ? "red"
                            : "pink"
                        }-700`}
                      >
                        {cartItems.some((p) => p.id === item.id)
                          ? "Remove "
                          : "Add to Cart"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </section>
    </Layout>
  );
};

export default ProductInfo;
