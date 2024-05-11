import { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import MyContext from "../../context/myContext";
import { useParams, useNavigate } from "react-router"; // Import useNavigate

import { fireDB } from "../../firebase/FirebaseConfig";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";

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
  const [userMap, setUserMap] = useState({}); // Map to store user data

  const { id } = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const navigate = useNavigate(); // Initialize useNavigate

  const getProductData = async () => {
    setLoading(true);
    try {
      const productTemp = await getDoc(doc(fireDB, "products", id));
      setProduct({ ...productTemp.data(), id: productTemp.id });
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

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Check if user is logged in, if not, navigate to login page
      const user = JSON.parse(localStorage.getItem("users"));
      if (!user) {
        navigate("/login");
        return;
      }

      await addFeedback(id, feedbackContent);
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

  useEffect(() => {
    getProductData();
    getFeedbackForProduct(id);
    getUserData(); // Fetch user data
  }, []);

  return (
    <Layout>
      <section className="py-5 lg:py-16 font-poppins dark:bg-wheat  ">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <div className="max-w-5xl px-4 mx-auto h-full border items-center rounded-3xl">
            <div className="flex flex-wrap mb-24 -mx-4">
              <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
                <div className="">
                  <div className="">
                    <img
                      className=" w-full lg:h-[39em] rounded-lg"
                      src={product?.productImageUrl}
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="w-full px-4 md:w-1/2 content-center ">
                <div className="lg:pl-20 ">
                  <div className="mb-6 ">
                    <h2 className="max-w-xl mb-6 text-xl font-semibold leading-loose tracking-wide text-gray-700 md:text-2xl dark:text-gray-800">
                      {product?.title}
                    </h2>
                    <div className="flex flex-wrap items-center mb-6">
                      <p className="inline-block text-2xl font-semibold text-gray-700 dark:text-gray-800">
                        <span>₹ {product?.price}</span>
                      </p>
                    </div>
                    <div className="mb-6">
                      <h2 className="mb-2 text-lg font-bold text-gray-700 dark:text-gray-400">
                        Description :
                      </h2>
                      <p>{product?.description}</p>
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
                      <h2 className="mb-2 text-lg font-bold text-gray-700 dark:text-gray-400">
                        Feedback :
                      </h2>
                      <ul>
                        {allFeedback.map((feedback) => (
                          <li key={feedback.id}>
                            <strong> {userMap[feedback.userId]?.username || "Anonymous"} :-   </strong>
                             {feedback.content}
                             <br/>
                          </li>
                        ))}
                      </ul> 
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default ProductInfo;
