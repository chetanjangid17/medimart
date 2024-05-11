import React, { useContext } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-hot-toast";
import myContext from "../../context/myContext";
import { fireDB } from "../../firebase/FirebaseConfig";

const UserDetail = () => {
    const context = useContext(myContext);
    const { getAllUser, setGetAllUser, setLoading } = context;

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

    return (
        <div>
            <div>
                <div className="py-5 flex justify-between items-center">
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
                                <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara">
                                    Role
                                </th>
                                <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara">
                                    Date
                                </th>
                                <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara">
                                    Actions
                                </th>
                            </tr>
                            {getAllUser.map((user, index) => (
                                <tr key={user.id}  className="text-pink-300">
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
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 cursor-pointer">
                                        {user.role}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 cursor-pointer">
                                        {user.date}
                                    </td>
                                    <td>
                                        <button onClick={() => handleDeleteUser(user.id)} className="...">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserDetail;
