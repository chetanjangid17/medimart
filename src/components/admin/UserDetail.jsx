import { useState, useEffect, useContext } from "react";
import myContext from "../../context/myContext";

const UserDetail = () => {
    const context = useContext(myContext);
    const { getAllUser } = context;

    // State to store delete requests
    const [deleteRequests, setDeleteRequests] = useState([]);

    // Function to fetch delete requests
    const fetchDeleteRequests = async () => {
        try {
            const response = await fetch('/delete-requests'); // Assuming you have an endpoint to fetch delete requests
            if (response.ok) {
                const data = await response.json();
                setDeleteRequests(data);
            } else {
                console.error('Failed to fetch delete requests');
            }
        } catch (error) {
            console.error('Error fetching delete requests:', error);
        }
    };

    // Function to handle delete account request by the admin
    const handleDeleteAccount = async (userId) => {
        try {
            const response = await fetch(`/delete-account/${userId}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                console.log('User account deleted successfully');
                // Refresh the list of users to reflect the changes
                getAllUserFunction();
            } else {
                console.error('Failed to delete user account');
            }
        } catch (error) {
            console.error('Error deleting user account:', error);
        }
    };

    useEffect(() => {
        // Fetch delete requests when the component mounts
        fetchDeleteRequests();
    }, []);

    return (
        <div>
            <div>
                <div className="py-5 flex justify-between items-center">
                    {/* text  */}
                    <h1 className="text-xl text-pink-300 font-bold">All User</h1>
                </div>

                {/* table  */}
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
                            {getAllUser.map((value, index) => {
                                return (
                                    <tr key={index} className="text-pink-300">
                                        <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500">
                                            {index + 1}
                                        </td>
                                        <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase">
                                            {value.name}
                                        </td>
                                        <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 cursor-pointer">
                                            {value.email}
                                        </td>
                                        <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 cursor-pointer">
                                            {value.uid}
                                        </td>
                                        <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 cursor-pointer">
                                            {value.role}
                                        </td>
                                        <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 cursor-pointer">
                                            {value.date}
                                        </td>
                                        <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 cursor-pointer">
                                            {/* Check if the user has a delete request */}
                                            {deleteRequests.some(request => request.userId === value.uid) ? (
                                                <button onClick={() => handleDeleteAccount(value.uid)}>Delete Account</button>
                                            ) : (
                                                <span>No Delete Request</span>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserDetail;
