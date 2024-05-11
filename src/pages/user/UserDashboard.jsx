import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";
import toast from 'react-hot-toast'; // Import toast for notifications

const UserDashboard = () => {
    const user = JSON.parse(localStorage.getItem('users'));
    const context = useContext(myContext);
    const { loading, getAllOrder, addFeedback, deleteUsersCollection, requestOrderReturn } = context;
    const [feedbackContentMap, setFeedbackContentMap] = useState({}); // Feedback content for each product
    const [isSubmitting, setIsSubmitting] = useState({}); // Submission status for each product
    const navigate = useNavigate();

    // logout function 
    const logout = () => {
        localStorage.clear('users');
        navigate("/login");
    };

    // Function to handle account deletion
    const handleDeleteAccount = () => {
        if (window.confirm("Are you sure you want to delete your account?")) {
            deleteUsersCollection(user.uid);
            localStorage.clear('users');
            navigate("/login");
        }
    };

    // Function to handle feedback submission for a specific product
    const handleSubmitFeedback = async (e, productId) => {
        e.preventDefault();
        setIsSubmitting(prevState => ({ ...prevState, [productId]: true })); // Set submission status to true for the specific product
        try {
            // Check if user is logged in
            const user = JSON.parse(localStorage.getItem("users"));
            if (!user) {
                toast.error("Please log in to submit feedback");
                return;
            }

            // Submit feedback for the specific product
            await addFeedback(productId, feedbackContentMap[productId]);
            toast.success("Feedback submitted successfully");
            setFeedbackContentMap(prevState => ({ ...prevState, [productId]: '' })); // Clear feedback content for the specific product after submission
        } catch (error) {
            console.error("Error submitting feedback:", error);
        }
        setIsSubmitting(prevState => ({ ...prevState, [productId]: false })); // Set submission status back to false for the specific product
    };

    // Function to handle request order return
    const handleRequestOrderReturn = (orderId) => {
        if (window.confirm("Are you sure you want to request a return for this order?")) {
            requestOrderReturn(orderId);
        }
    };

    return (
        <Layout>
            <div className="container mx-auto px-4 py-5 lg:py-8">
                {/* Top */}
                <div className="top">
                    {/* Main */}
                    <div className="bg-pink-50 py-5 rounded-xl border border-pink-100">
                        {/* Image */}
                        <div className="flex justify-center">
                            <img src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png" alt="" />
                        </div>
                        {/* Text */}
                        <div className="">
                            {/* Name */}
                            <h1 className="text-center text-lg capitalize">
                                <span className="font-bold">Name : </span>
                                {user?.name}
                            </h1>

                            {/* Email */}
                            <h1 className="text-center text-lg">
                                <span className="font-bold">Email : </span>
                                {user?.email}
                            </h1>

                            {/* Phone number */}
                            <h1 className="text-center text-lg">
                                <span className="font-bold">Phone Number : </span>
                                {user?.phoneNumber}
                            </h1>
                            {/* Date */}
                            <h1 className="text-center text-lg">
                                <span className="font-bold">Date : </span>
                                {user?.date}
                            </h1>
                            <div className="  mt-3 flex justify-center">
                                {user && (
                                    <>
                                        {/* <button className="hover:bg-purple-300 bg-red-600 cursor-pointer btn btn-ghost items-center mr-2" onClick={() => handleDeleteAccount(user?.uid)}>
                                            Delete Account
                                        </button> */}
                                        <button className="hover:bg-purple-300 bg-red-600 cursor-pointer btn btn-ghost items-center" onClick={logout}>
                                            Logout
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="bottom">
                    {/* Main 1 */}
                    <div className="mx-auto my-4 max-w-6xl px-2 md:my-6 md:px-0">
                        {/* Text */}
                        <h2 className="text-2xl lg:text-3xl font-bold">Order Details</h2>

                        <div className="flex justify-center relative top-10">
                            {loading && <Loader />}
                        </div>

                        {/* Main 2 */}
                        {getAllOrder.filter((obj) => obj.userid === user?.uid).map((order, index) => (
                            <div key={index}>
                                {order.cartItems.map((item, index) => {
                                    const { id, date, quantity, price, title, productImageUrl, category } = item;
                                    const { status } = order;
                                    const productId = id; // Assign product id
                                    return (
                                        <div key={index} className="mt-5 flex flex-col overflow-hidden rounded-xl border border-pink-100 md:flex-row">
                                            {/* Left */}
                                            <div className="w-full border-r border-pink-100 bg-pink-50 md:max-w-xs">
                                                <div className="p-8">
                                                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1">
                                                        <div className="mb-4">
                                                            <div className="text-sm font-semibold text-black">Order Id</div>
                                                            <div className="text-sm font-medium text-gray-900">#{id}</div>
                                                        </div>
                                                        <br/>

                                                        <div className="mb-4">
                                                            <div className="text-sm font-semibold">Date</div>
                                                            <div className="text-sm font-medium text-gray-900">{date}</div>
                                                        </div>

                                                        <div className="mb-4">
                                                            <div className="text-sm font-semibold">Total Amount</div>
                                                            <div className="text-sm font-medium text-red-600">₹ {price * quantity}</div>
                                                        </div>

                                                        <div className="mb-4">
                                                            <div className="text-sm font-semibold">Order Status</div>
                                                            <div className={`text-sm font-medium text-${status === 'pending' ? 'red' : 'green'}-800 first-letter:uppercase  text-green-600 `}>{status}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Right */}
                                            <div className="flex-1">
                                                <div className="p-8">
                                                    <ul className="-my-7 divide-y divide-gray-200">
                                                        <li className="flex flex-col justify-between space-x-5 py-7 md:flex-row">
                                                            <div className="flex flex-1 items-stretch">
                                                                <div className="flex-shrink-0">
                                                                    <img
                                                                        className="h-40 w-40 rounded-lg border border-gray-200 object-contain"
                                                                        src={productImageUrl}
                                                                        alt="img"
                                                                    />
                                                                </div>

                                                                <div className="ml-5 flex flex-col justify-between">
                                                                    <div className="flex-1">
                                                                        <p className="text-sm font-bold text-gray-900">{title}</p>
                                                                        <p className="mt-1.5 text-sm font-medium text-gray-500">{category}</p>
                                                                    </div>

                                                                    <p className="mt-4 text-sm font-medium text-gray-500">x {quantity}</p>
                                                                </div>
                                                            </div>

                                                            <div className="ml-auto flex flex-col items-end justify-between ">
                                                                <p className="text-right text-sm font-bold text-gray-900">₹ {price}</p>
                                                            <div className="mt-2">
                                                            <button
                                                                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
                                                                onClick={() => handleRequestOrderReturn(order.id)}
                                                            >
                                                                Request Order Return
                                                            </button>
                                                        </div>
                                                                <div className="mt-4">
                                                                    <form onSubmit={(e) => handleSubmitFeedback(e, productId)}>
                                                                        <textarea
                                                                            className="w-full h-12 px-3 py-2 text-base placeholder-gray-500 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                                                                            placeholder="Write your feedback here..."
                                                                            value={feedbackContentMap[productId] || ''}
                                                                            onChange={(e) => setFeedbackContentMap(prevState => ({ ...prevState, [productId]: e.target.value }))}
                                                                        ></textarea>
                                                                        <button
                                                                            type="submit"
                                                                            className="bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 mt-2"
                                                                            disabled={isSubmitting[productId]}
                                                                        >
                                                                            {isSubmitting[productId] ? 'Submitting...' : 'Submit Feedback'}
                                                                        </button>
                                                                    </form>
                                                                </div>
                                                            </div>
                                                        </li>
                                                      
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default UserDashboard;
