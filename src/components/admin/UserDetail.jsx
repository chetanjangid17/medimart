import React, { useContext, useState } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-hot-toast";
import myContext from "../../context/myContext";
import { fireDB } from "../../firebase/FirebaseConfig";
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

const UserDetail = () => {
    const context = useContext(myContext);
    const { getAllUser, getAllOrder, setLoading } = context;
    const [selectedUser, setSelectedUser] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const handleDeleteUser = async (id) => {
        setLoading(true);
        try {
            await deleteDoc(doc(fireDB, 'user', id));
            toast.success('User deleted successfully');
            // Update the user list after deletion
            const updatedUsers = getAllUser.filter(user => user.id !== id);
            // setGetAllUser(updatedUsers);
            setLoading(false);
        } catch (error) {
            console.error("Error deleting user:", error);
            toast.error("Failed to delete user");
            setLoading(false);
        }
    };

    const openModal = (user) => {
        setSelectedUser(user);
        setModalOpen(true);
    };

    const closeModal = () => {
        setSelectedUser(null);
        setModalOpen(false);
    };

    return (
        <div>
            <div>
                <div className="py-5  text-center">
                    <h1 className="text-xl text-pink-300 font-bold">All Users</h1>
                </div>
                <div className="w-full overflow-x-auto">
                    <table className="w-full text-left border border-collapse sm:border-separate border-pink-100 text-pink-400">
                        <tbody>
                            <tr>
                                <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara">
                                    S.No.
                                </th>
                                <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara">
                                    Name
                                </th>
                                <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara">
                                    Email
                                </th>
                                <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara">
                                    Uid
                                </th>
                                {/* <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara">
                                    Role
                                </th> */}
                                <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara">
                                    Date
                                </th>
                                <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara">
                                    Actions
                                </th>
                                <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara">
                                    Orders
                                </th>
                            </tr>
                            {getAllUser.map((user, index) => (
                                <tr key={user.id} className="text-pink-300">
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500">
                                        {index + 1}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase">
                                        {user.name}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 cursor-pointer">
                                        {user.email}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 cursor-pointer">
                                        {user.uid}
                                    </td>
                                    {/* <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 cursor-pointer">
                                        {user.role}
                                    </td> */}
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 cursor-pointer">
                                        {user.date}
                                    </td>
                                    <td>
                                        <button onClick={() => handleDeleteUser(user.id)} className="...">Delete</button>
                                        </td>
                                    <td>
                                        <button onClick={() => openModal(user)} className="...">Order History</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Modal for displaying order history */}
            <Modal open={modalOpen} onClose={closeModal} center>
                <h2>Order History for {selectedUser && selectedUser.name}</h2>
                <div>
                    {selectedUser && getAllOrder
                        .filter((obj) => obj.userid === selectedUser.uid)
                        .map((order, index) => (
                            <div key={index}>
                                {order.cartItems.map((item, index) => {
                                    const { id, date, quantity, price, title, productImageUrl, category } = item;
                                    const { status } = order;
                                    const productId = id; // Assign product id
                                    return (
                                        <div key={index} className="mt-5 flex flex-col overflow-hidden rounded-xl border border-pink-100 md:flex-row">
                                            {/* Left */}
                                            <div className="w-full border-r border-pink-100 bg-[#E2F2F2] md:max-w-xs">
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

                                                                <div className="ml-10 flex flex-col justify-between">
                                                                    <div className="flex-1">
                                                                        <p className="text-sm font-bold text-gray-900">{title}</p>
                                                                        <p className="mt-1.5 text-sm font-medium text-gray-500">{category}</p>
                                                                    </div>

                                                                    <p className="mt-4 text-sm font-medium text-gray-500">x {quantity}</p>
                                                                </div>
                                                            </div>

                                                            <div className="ml-auto flex flex-col items-end justify-between ">
                                                                <p className="text-right text-sm font-bold text-gray-900">₹ {price}</p>
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
            </Modal>
        </div>
    );
};

export default UserDetail;
