import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OrderSummary = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('https://localhost:7151/api/Order/getOrderDetails', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      })
      .then((res) => {
        const reversedOrders = [...res.data].reverse();
        setOrders(reversedOrders);
      })
      .catch((err) => {
        console.error('Error fetching orders:', err);
      });
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-10">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-teal-700 mb-6 text-center">Order Summary</h1>

        {orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-gray-50 shadow-md rounded-lg p-6 space-y-4 border border-teal-700"
              >
                <div>
                  <h2 className="text-lg font-semibold text-teal-800">Order ID: {order.orderId}</h2>
                  <p className="text-gray-600">
                    <span className="font-medium">Order Date:</span> {formatDate(order.orderDate)}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Status:</span> {order.orderStatus}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Transaction ID:</span> {order.transactionId}
                  </p>
                </div>

                <div className="space-y-4 ">
                  {order.orderProducts.map((product) => (
                    <div
                      key={product.productId}
                      className="flex items-center bg-white rounded-lg shadow-md p-4 border border-gray-300"
                    >
                      <div className="w-20 h-20 bg-gray-200 rounded-md overflow-hidden mr-4">
                        <img
                          src={product.image}
                          alt={product.productName}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-grow">
                        <h3 className="text-md font-semibold text-teal-800">
                          {product.productName}
                        </h3>
                        <p className="text-gray-600">
                          <span className="font-medium">Quantity:</span> {product.quantity}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">Price:</span> &#8377;{product.price}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">Total:</span> &#8377;{product.totalAmount}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center py-20">
            <p className="text-gray-500 text-lg">No orders found. Start shopping now!</p>
          </div>
        )}

        <div className="flex justify-center mt-10">
          <button
            onClick={() => navigate('/')}
            className="bg-teal-800 text-white py-3 px-6 rounded-lg shadow hover:bg-teal-700 transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;


