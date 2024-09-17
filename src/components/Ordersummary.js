import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OrderSummary = () => {
  const [orderdetails, setOrderdetails] = useState({});
  const userId = localStorage.getItem("userId");
  const navigate=useNavigate()

  useEffect(() => {
    axios.get(`http://localhost:3001/users/${userId}`)
      .then((res) => setOrderdetails(res.data.orderdetails))
      .catch((err) => console.log("fetching error..", err));
  }, [userId]);

  const { Address } = orderdetails;
  const { product } = orderdetails;

  return (
    <div className=' flex flex-col items-center min-h-screen bg-gray-200'>
      <div className=' mt-24 bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl'>
        {/* Shipping Address */}
        <div className='mb-8'>
          <h1 className='text-2xl font-bold text-teal-700 mb-4'>Shipping Address</h1>
          {Address ? (
            Address.map((item, index) => (
              <div key={index} className='border-b border-gray-300 pb-4 mb-4'>
                <p className='text-teal-800 font-semibold'>{item.address}</p>
                <p className='text-gray-600'>{item.city}, {item.state} - {item.zipCode}</p>
                <p className='text-gray-600'>Phone: {item.phoneNumber}</p>
                <p className='text-gray-600'>Payment Method: {item.paymentMethod}</p>
              </div>
            ))
          ) : (
            <p className='text-gray-500'>No shipping address available.</p>
          )}
        </div>

        {/* Product Details */}
        <div>
          <h1 className='text-2xl font-bold text-teal-700 mb-4'>Product Details</h1>
          {product ? (
            product.map((item, index) => (
              <div key={index} className='  mb-4'>
                <h3 className='text-teal-800 font-semibold'>{item.name}</h3>
                <p className='text-gray-600'>{item.description}</p>
                <p className='text-gray-600'>Category: {item.category}</p>
                <p className='text-gray-600'>Quantity: {item.quantity}</p>
              </div>
            ))
            
          ) : (
            <p className='text-gray-500'>No products available.</p>
          )}
           <p className='text-lg font-semibold text-teal-800'>Total Price: ${orderdetails.totalPrice}</p>
           
          
          <div className='flex justify-center'>
          <button onClick={()=>navigate("/")}
          className="bg-teal-800 text-white py-3 px-6 rounded-lg shadow hover:bg-teal-700 transition-all">
            Done
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
