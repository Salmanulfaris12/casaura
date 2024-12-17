import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Context/Cartcontext'; 

const Profile = () => {
  const [user, setUser] = useState({});
  const{cart}=useCart();
  const name = localStorage.getItem('name');
  const email=localStorage.getItem('email');
  const navigate = useNavigate(); 

  const handleOrderSummary = () => {
    navigate('/order-summary');
  };

  return (
    <div className="min-h-screen bg-teal-800 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-teal-800 mb-4 text-center">Profile Information</h2>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-semibold text-teal-700">Name:</span>
            <span className="text-gray-600 text-right">{name}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-teal-700">Email:</span>
            <span className="text-gray-600 text-right">{email}</span>
          </div>
          {cart && cart.totalItem > 0 ? (
            <div className="flex justify-between">
              <span className="font-semibold text-teal-700">Cart Items:</span>
              <div className="text-gray-600 text-left">
                {cart.cartItemsperUser.map((item, index) => (
                  <li key={index}>{item.productName} - ({item.quantity})</li>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-gray-600 italic">No items in the cart</div>
          )}
        </div>

        {/* Order Summary and Logout Buttons */}
        <div className="mt-6 space-y-3">
          <button
            onClick={handleOrderSummary}
            className="w-full py-2 px-4 bg-teal-800 text-white font-semibold rounded-md shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            Order Summary
          </button>
          <button
            onClick={()=>{
                localStorage.clear();
                navigate("/")
                setUser({})

            }}
            className="w-full py-2 px-4 bg-red-800 text-white font-semibold rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
