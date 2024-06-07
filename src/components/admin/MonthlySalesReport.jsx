import { useContext, useState, useEffect } from "react";
import myContext from "../../context/myContext";

const MonthlySalesReport = () => {
    const context = useContext(myContext);
    const { getAllOrder } = context;

    const [monthlySales, setMonthlySales] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState('');

    useEffect(() => {
        if (getAllOrder.length > 0) {
            generateMonthlySalesReport(getAllOrder, selectedMonth);
        }
    }, [getAllOrder, selectedMonth]);

    const generateMonthlySalesReport = (orders, selectedMonth) => {
        const salesData = {};

        orders.forEach(order => {
            const orderDate = new Date(order.date);
            const month = orderDate.toLocaleString('en-US', { month: 'long' });
            const year = orderDate.getFullYear();
            const monthYear = `${month} ${year}`;

            if ((!selectedMonth || monthYear === selectedMonth) && !salesData[monthYear]) {
                salesData[monthYear] = {
                    monthYear,
                    products: {},
                    quantitySold: 0,
                    totalSales: 0
                };
            }

            if (!selectedMonth || monthYear === selectedMonth) {
                order.cartItems.forEach(item => {
                    if (!salesData[monthYear].products[item.id]) {
                        salesData[monthYear].products[item.id] = {
                            title: item.title,
                            category: item.category,
                            productImageUrl: item.productImageUrl,
                            quantitySold: 0,
                            totalSales: 0
                        };
                    }
                    salesData[monthYear].products[item.id].quantitySold += item.quantity;
                    salesData[monthYear].products[item.id].totalSales += item.price * item.quantity;
                    salesData[monthYear].quantitySold += item.quantity;
                    salesData[monthYear].totalSales += item.price * item.quantity;
                });
            }
        });

        setMonthlySales(Object.values(salesData));
    };

    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value);
    };

    return (
        <div>
            <div className="py-5 text-center">
                <h1 className="text-xl text-pink-300 font-bold">Monthly Sales Report</h1>
                <div className="my-4">
                    <label htmlFor="month" className="block text-pink-400">Select Month:</label>
                    <select
                        id="month"
                        className="border rounded px-2 py-1"
                        value={selectedMonth}
                        onChange={handleMonthChange}
                    >
                        <option value="">All Months</option>
                        {/* Assuming getAllOrder provides data for all months */}
                        {monthlySales.map((monthSale, index) => (
                            <option key={index} value={monthSale.monthYear}>{monthSale.monthYear}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="w-full overflow-x-auto">
                {monthlySales.map((monthSale, index) => (
                    <div key={index} className="mb-8">
                        <h2 className="text-lg text-pink-300 font-bold">{monthSale.monthYear}</h2>
                        <table className="w-full text-left border-collapse sm:border-separate border-pink-100 text-pink-400 mt-4">
                            <thead>
                                <tr>
                                    <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold">S.No.</th>
                                    <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold">Image</th>
                                    <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold">Title</th>
                                    <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold">Category</th>
                                    <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold">Quantity Sold</th>
                                    <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold">Total Sales</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.values(monthSale.products).map((product, index) => (
                                    <tr key={index} className="text-pink-300">
                                        <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 text-slate-500">{index + 1}</td>
                                        <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 text-slate-500">
                                            <img src={product.productImageUrl} alt="product" width="50" />
                                        </td>
                                        <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 text-slate-500">{product.title}</td>
                                        <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 text-slate-500">{product.category}</td>
                                        <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 text-slate-500">{product.quantitySold}</td>
                                        <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 text-slate-500">₹{product.totalSales}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MonthlySalesReport;
