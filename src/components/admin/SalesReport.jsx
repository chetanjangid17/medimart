import { useContext, useState, useEffect } from "react";
import myContext from "../../context/myContext";
import jsPDF from "jspdf";
import "jspdf-autotable";

const SalesReport = () => {
    const context = useContext(myContext);
    const { getAllOrder } = context;

    const [productSales, setProductSales] = useState([]);
    const [totalSales, setTotalSales] = useState(0);

    useEffect(() => {
        const salesData = {};

        getAllOrder.forEach(order => {
            order.cartItems.forEach(item => {
                if (!salesData[item.id]) {
                    salesData[item.id] = {
                        title: item.title,
                        category: item.category,
                        productImageUrl: item.productImageUrl,
                        quantitySold: 0,
                        totalSales: 0
                    };
                }
                salesData[item.id].quantitySold += item.quantity;
                salesData[item.id].totalSales += item.price * item.quantity;
            });
        });
        let total = 0;
        getAllOrder.forEach(order => {
            order.cartItems.forEach(item => {
                total += item.price * item.quantity;
            });
        });
        setTotalSales(total);

        setProductSales(Object.values(salesData));
    }, [getAllOrder]);

    const generatePDF = () => {
        const doc = new jsPDF();

        doc.text("Sales Report", 14, 20);
        doc.text(`All Over Sales: ${totalSales}`, 14, 30);

        const tableColumn = ["S.No.", "Title", "Category", "Quantity Sold", "Total Sales"];
        const tableRows = [];

        productSales.forEach((product, index) => {
            const productData = [
                index + 1,
                product.title,
                product.category,
                product.quantitySold,
                product.totalSales
            ];
            tableRows.push(productData);
        });

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 40,
            columnStyles: {
                3: {
                    halign: 'center',
                },
                4: {
                    halign: 'center',
                }
            }
        });

        doc.save("sales_report.pdf");
    };

    return (
        <div>
            <div className="py-5 text-center">
                <h1 className="text-xl text-pink-300 font-bold">Sales Report</h1>
                <h2 className="text-lg text-green-500 font-bold ">All Over Sales: ₹{totalSales}</h2>
                <button onClick={generatePDF} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                    Download PDF
                </button>
            </div>
            <div className="w-full overflow-x-auto">
                <table className="w-full text-left border-collapse sm:border-separate border-pink-100 text-pink-400">
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
                        {productSales.map((product, index) => (
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
        </div>
    );
};

export default SalesReport;
