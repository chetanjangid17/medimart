import { useContext , useState,useEffect} from "react";
import myContext from "../../context/myContext";

const OrderDetail = () => {
    const context = useContext(myContext);
    const { getAllOrder, orderDelete, updateOrderStatus } = context;

    const handleStatusChange = (orderId, newStatus) => {
        updateOrderStatus(orderId, newStatus);
    };

    // State to manage the selected status for each row
    const [selectedStatuses, setSelectedStatuses] = useState({});
    const [totalSales, setTotalSales] = useState(0);

        // State variables for filters
        const [statusFilter, setStatusFilter] = useState("");
        const [productNameFilter, setProductNameFilter] = useState("");
        const [userNameFilter, setUserNameFilter] = useState("");

    // Function to update the selected status for a specific order
    const handleSelectChange = (orderId, value) => {
        setSelectedStatuses(prevState => ({
            ...prevState,
            [orderId]: value
        }));
    };
    useEffect(() => {
        let total = 0;
        getAllOrder.forEach(order => {
            order.cartItems.forEach(item => {
                total += item.price * item.quantity;
            });
        });
        setTotalSales(total);
    }, [getAllOrder]);

     // Filter orders based on status, product name, and user name
     const filteredOrders = getAllOrder.filter(order => {
        const matchesStatus = statusFilter ? order.status === statusFilter : true;
        const matchesProductName = productNameFilter ? 
            order.cartItems.some(item => item.title.toLowerCase().includes(productNameFilter.toLowerCase())) : true;
        const matchesUserName = userNameFilter ? 
            order.addressInfo.name.toLowerCase().includes(userNameFilter.toLowerCase()) : true;
        return matchesStatus && matchesProductName && matchesUserName;
    });

    
    // console.log(getAllOrder)
    return (
        <div>
            <div>
                <div className="py-5 text-center">
                    {/* text  */}
                    <h1 className=" text-xl text-pink-300 font-bold">All Order</h1>
                <h2 className="text-lg text-green-500 font-bold">Total Sales: ₹{totalSales}</h2>
                </div>
                <div className="py-4 flex justify-center space-x-6">
                <input 
                    type="text" 
                    placeholder="Filter by User Name" 
                    value={userNameFilter} 
                    onChange={(e) => setUserNameFilter(e.target.value)} 
                    className="border p-2"
                />
                {/* <input 
                    type="text" 
                    placeholder="Filter by Product Name" 
                    value={productNameFilter} 
                    onChange={(e) => setProductNameFilter(e.target.value)} 
                    className="border p-2"
                /> */}
                <select 
                    value={statusFilter} 
                    onChange={(e) => setStatusFilter(e.target.value)} 
                    className="border p-2"
                >
                    <option value="">Filter by Status</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Return Accepted">Return Accepted</option>
                    <option value="Cancel Order">Cancel Order</option>
                    <option value="Confirmed">Confirmed</option>


                </select>
            </div>

                {/* table  */}
                <div className="w-full overflow-x-auto">
                    <table className="w-full text-left border border-collapse sm:border-separate border-pink-100 text-pink-400" >
                        <tbody>
                            <tr>
                                <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara">
                                    S.No.
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                                    Order Id
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                                    Image
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                                    Title
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                                    Category
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                                    Price
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                                    Quantity
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                                    Total Price
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                                    Status
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                                    Name
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                                    Address
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                                    Pincode
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                                    Phone Number
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                                    Email
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                                    Date
                                </th>

                               
                                
                                <th scope="col"
                                    className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                                    Status Change
                                </th>


                                <th scope="col"
                                    className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                                    Action
                                </th>
 


                            </tr>
                            {filteredOrders.map((order,orderIndex) => {
                                console.log(order)
                                return (
                                    <>
                                        {order.cartItems.map((item) => {
                                            const { id, productImageUrl, title, category, price, quantity } = item
                                            return (
                                                <tr key={orderIndex} className="text-pink-300">
                                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 ">
                                                        {orderIndex+1}
                                                    </td>

                                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 ">
                                                        {id}
                                                    </td>

                                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                                        <img src={productImageUrl} alt="img" />
                                                    </td>

                                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                                        {title}
                                                    </td>

                                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                                        {category}
                                                    </td>

                                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                                        ₹{price}
                                                    </td>

                                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                                        {quantity}
                                                    </td>

                                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                                        ₹{price * quantity}
                                                    </td>

                                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l text-green-600  first:border-l-0 border-pink-100 stroke-slate-500  first-letter:uppercase ">
                                                        {order.status}
                                                    </td>

                                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                                        {order.addressInfo.name}
                                                    </td>

                                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                                        {order.addressInfo.address}
                                                    </td>

                                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                                        {order.addressInfo.pincode}
                                                    </td>

                                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                                        {order.addressInfo.mobileNumber}
                                                    </td>

                                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 ">
                                                        {order.email}
                                                    </td>

                                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                                        {order.date}
                                                    </td>

                                                    {/* <td onClick={()=> orderDelete(order.id)} className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500  text-red-500 cursor-pointer ">
                                                        Delete
                                                    </td> */}
                                                    <td>
                                                        {/* Dropdown menu for selecting status */}
                                                        <select
                                                            value={selectedStatuses[order.id] || ''}
                                                            onChange={(e) => handleSelectChange(order.id, e.target.value)}
                                                            className="cursor-pointer focus:outline-none"
                                                        >
                                                            <option value="">Select Status</option>
                                                            <option value="Delivered">Delivered</option>
                                                            <option value="Return Accepted">Return Accepted</option>
                                                            <option value="Cancel Order">Cancel Order</option>
                                                            {/* <option value="Confirmed">"Confirmed"</option> */}
                                                        </select>
                                                    </td>
                                                    <td>
                                                        <button onClick={() => handleStatusChange(order.id, selectedStatuses[order.id])} className="cursor-pointer">
                                                            Change Status
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default OrderDetail;
