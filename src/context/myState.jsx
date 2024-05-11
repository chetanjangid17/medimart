import { useEffect, useState } from 'react';
import MyContext from './myContext';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore';
import { addDoc, where } from 'firebase/firestore';
import { fireDB } from '../firebase/FirebaseConfig';
import toast from 'react-hot-toast';

function MyState({ children }) {
    // Loading State 
    const [loading, setLoading] = useState(false);

    // User State
    const [getAllProduct, setGetAllProduct] = useState([]);
    const [getAllOrder, setGetAllOrder] = useState([]);
    const [getAllUser, setGetAllUser] = useState([]);
    const [allFeedback, setAllFeedback] = useState([]);

    /**========================================================================
     *                          GET All Product Function
     *========================================================================**/

    const getAllProductFunction = async () => {
        setLoading(true);
        try {
            const q = query(
                collection(fireDB, "products"),
                orderBy('time')
            );
            const data = onSnapshot(q, (QuerySnapshot) => {
                let productArray = [];
                QuerySnapshot.forEach((doc) => {
                    productArray.push({ ...doc.data(), id: doc.id });
                });
                setGetAllProduct(productArray);
                setLoading(false);
            });
            return () => data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const getAllOrderFunction = async () => {
        setLoading(true);
        try {
            const q = query(
                collection(fireDB, "order"),
                orderBy('time')
            );
            const data = onSnapshot(q, (QuerySnapshot) => {
                let orderArray = [];
                QuerySnapshot.forEach((doc) => {
                    orderArray.push({ ...doc.data(), id: doc.id });
                });
                setGetAllOrder(orderArray);
                setLoading(false);
            });
            return () => data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const getAllUserFunction = async () => {
        setLoading(true);
        try {
            const q = query(
                collection(fireDB, "user"),
                orderBy('time')
            );
            const data = onSnapshot(q, (QuerySnapshot) => {
                let userArray = [];
                QuerySnapshot.forEach((doc) => {
                    userArray.push({ ...doc.data(), id: doc.id });
                });
                setGetAllUser(userArray);
                setLoading(false);
            });
            return () => data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const getAllProductFunctio = async () => {
        setLoading(true);
        try {
            const q = query(
                collection(fireDB, "products"),
                orderBy('time')
            );
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const productArray = [];
                querySnapshot.forEach((doc) => {
                    productArray.push({ ...doc.data(), id: doc.id });
                });
                setGetAllProduct(productArray);
                setLoading(false);
            });
            return () => unsubscribe();
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const requestOrderReturn = async (orderId) => {
        setLoading(true);
        try {
            // Update the order status in Firestore to indicate a return request
            const orderRef = doc(fireDB, 'order', orderId);
            await updateDoc(orderRef, {
                status: 'return_requested'
            });
            
            toast.success('Order return requested successfully');
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

   

    const orderDelete = async (id) => {
        setLoading(true)
        try {
            await deleteDoc(doc(fireDB, 'order', id))
            toast.success('Order Deleted successfully')
            getAllOrderFunction();
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

   

    const getFeedbackForProduct = async (productId) => {
        setLoading(true);
        try {
            const q = query(
                collection(fireDB, "feedback"),
                where('productId', '==', productId),
                orderBy('time')
            );
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const feedbackArray = [];
                querySnapshot.forEach((doc) => {
                    feedbackArray.push({ ...doc.data(), id: doc.id });
                });
                setAllFeedback(feedbackArray);
                setLoading(false);
            });
            return () => unsubscribe();
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const addFeedback = async (productId, content) => {
        setLoading(true);
        try {
            const docRef = await addDoc(collection(fireDB, "feedback"), {
                productId: productId,
                content: content,
                time: new Date(),
            });

            setLoading(false);
        } catch (error) {
            console.error("Error adding feedback: ", error);
            setLoading(false);
        }
    };

    const updateOrderStatus = async (orderId, status) => {
        setLoading(true);
        try {
            // Update the order status in Firestore
            const orderRef = doc(fireDB, 'order', orderId);
            await updateDoc(orderRef, {
                status: status
            });
            toast.success('Order status updated successfully');
            setLoading(false);
        } catch (error) {
            console.error('Error updating order status:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllProductFunction();
        getAllProductFunctio();
        getAllOrderFunction();
        getAllUserFunction();
    }, []);

    return (
        <MyContext.Provider value={{
            loading,
            setLoading,
            getAllProduct,
            getAllProductFunction,
            getAllOrder,
            orderDelete,
            getAllUser,
            allFeedback,
            getFeedbackForProduct,
            addFeedback,
            requestOrderReturn,
            updateOrderStatus, // Include the updateOrderStatus function in the context
        }}>
            {children}
        </MyContext.Provider>
    )
}

export default MyState;
