import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import { toast } from "react-hot-toast";

const TopSellingProducts = ({ getAllOrder }) => {
    const [topProducts, setTopProducts] = useState([]);

    useEffect(() => {
        if (getAllOrder.length > 0) {
            fetchTopSellingProducts();
        }
    }, [getAllOrder]);

    const fetchTopSellingProducts = async () => {
        try {
            let productMap = new Map(); // Map to store product-wise total quantity sold

            getAllOrder.forEach((order) => {
                order.products.forEach((product) => {
                    const productId = product.productId;
                    const quantity = product.quantity;
                    if (productMap.has(productId)) {
                        productMap.set(productId, productMap.get(productId) + quantity);
                    } else {
                        productMap.set(productId, quantity);
                    }
                });
            });

            // Convert product map to array of objects for sorting
            let productsArray = Array.from(productMap, ([productId, quantity]) => ({ productId, quantity }));

            // Sort products by quantity sold in descending order
            productsArray.sort((a, b) => b.quantity - a.quantity);

            // Get top 10 selling products
            const topProducts = productsArray.slice(0, 10);
            setTopProducts(topProducts);
        } catch (error) {
            console.error("Error fetching top selling products:", error);
            toast.error("Failed to fetch top selling products");
        }
    };

    return (
        <div>
            <h1>Top Selling Products</h1>
            <ul>
                {topProducts.map((product, index) => (
                    <li key={product.productId}>
                        {index + 1}. Product ID: {product.productId}, Quantity Sold: {product.quantity}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TopSellingProducts;
