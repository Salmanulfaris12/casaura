import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const Profile = () => {
  const [user, setUser] = useState({});
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate(); // Use navigate for programmatic navigation

  useEffect(() => {
    if(userId){
    axios.get(`http://localhost:3001/users/${userId}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.log('Fetching error..', err));
    }
  }, [userId]);



  // Redirect to order summary page
  const handleOrderSummary = () => {
    navigate('/order-summary');
  };

  return (
    <div className="min-h-screen bg-teal-800 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-teal-800 mb-4 text-center">Profile Information</h2>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-semibold text-teal-700">User ID:</span>
            <span className="text-gray-600 text-left">{user.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-teal-700">Name:</span>
            <span className="text-gray-600 text-right">{user.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-teal-700">Email:</span>
            <span className="text-gray-600 text-right">{user.email}</span>
          </div>
          {user.cart && user.cart.length > 0 ? (
            <div className="flex justify-between">
              <span className="font-semibold text-teal-700">Cart Items:</span>
              <div className="text-gray-600 text-left">
                {user.cart.map((item, index) => (
                  <li key={index}>{item.name} - {item.category} ({item.quantity})</li>
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
