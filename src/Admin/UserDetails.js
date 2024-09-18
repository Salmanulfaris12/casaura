import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UserDetails = () => {
  const [user, setUser] = useState({});
  const { userid } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/users/${userid}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.log('fetching error', err));
  }, [userid]);

  // Check if user and orderdetails exist before deconstructing
  const orderDetails = user.orderdetails || {};
  const { Address = [] } = orderDetails;
  const { product = [] } = orderDetails;

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        {/* User Info */}
        <div className="border-b pb-4 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            User ID: {user.id}
          </h2>
          <p className="text-gray-700 mt-2">
            <span className="font-medium">Name:</span> {user.name}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Email:</span> {user.email}
          </p>
        </div>

        {/* Order Details */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {product.length > 0 ? (
              product.map((item) => (
                <div
                  key={item.id}
                  className="p-4 bg-gray-100 rounded-lg border border-gray-200"
                >
                  <p className="text-gray-800">
                    <span className="font-medium">Product ID:</span> {item.id}
                  </p>
                  <p className="text-gray-800">
                    <span className="font-medium">Name:</span> {item.name}
                  </p>
                  <p className="text-gray-800">
                    <span className="font-medium">Price:</span> ${item.price}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No products found.</p>
            )}
          </div>
        </div>

        {/* Address */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Shipping Address</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Address.length > 0 ? (
              Address.map((element, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-100 rounded-lg border border-gray-200"
                >
                  <p className="text-gray-800">
                    <span className="font-medium">Address:</span> {element.address}
                  </p>
                  <p className="text-gray-800">
                    <span className="font-medium">City:</span> {element.city}
                  </p>
                  <p className="text-gray-800">
                    <span className="font-medium">Zip Code:</span> {element.zipCode}
                  </p>
                    <div>
                        <p className="text-teal-800">
                        <span className="font-medium">Contact no. :</span> {element.phoneNumber}
                        </p>
                        <p className="text-teal-800">
                        <span className="font-medium">Payment Method :</span>{element.paymentMethod}
                        </p>
                        
                    </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No addresses found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
