import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const [items, setItems] = useState([]);
  const userId = localStorage.getItem('userId');
  const [formData,setFormData]=useState({
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phoneNumber: '',
    paymentMethod: ''
  })
  const navigate=useNavigate()

  const calculateSubTotal = () => {
    return items.reduce((total, ele) => total + ele.price * ele.quantity, 0);
  };

  const calculateDiscount = () => {
    return calculateSubTotal() * 0.05;
  };

  const calGrandTotal = () => {
    return calculateSubTotal() - calculateDiscount();
  };

  const total = calGrandTotal();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  console.log(formData)
 

  useEffect(() => {
    if(userId){
    axios.get(`http://localhost:3001/users/${userId}`)
      .then((res) => setItems(res.data.cart))
      .catch((err) => console.log('fetching error...', err));
    }
  }, [userId]);


  const handleSubmit=async(e)=>{
    e.preventDefault();

    try{
        await axios.patch(`http://localhost:3001/users/${userId}`,{orderdetails:{product:[...items],Address:[formData],totalPrice:total}})
        await axios.patch(`http://localhost:3001/users/${userId}`,{cart:[]})
        navigate("/order-summary",{replace:true})
    }
    catch{
        console.log("error")
    }

  }

  return (
    <div className=" min-h-screen flex flex-col items-center bg-teal-800">
      <div className=" mt-16 bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-teal-700 mb-6 text-center">Confirm Payment</h1>

        {/* Cart Items */}
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="flex justify-between items-center border-b border-gray-200 pb-4">
              <div>
                <h3 className="font-bold text-teal-700">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
                <p className="text-gray-500">Quantity: {item.quantity}</p>
              </div>
              <div className="text-teal-800 font-semibold">${item.price * item.quantity}</div>
            </div>
          ))}

          {/* Totals */}
          <div className="mt-6">
            <div className="flex justify-between">
              <span className="font-semibold text-teal-700">Subtotal:</span>
              <span className="text-teal-800">${calculateSubTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-teal-700">Discount (5%):</span>
              <span className="text-teal-800">-${calculateDiscount().toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-4">
              <span className="text-teal-800">Total:</span>
              <span className="text-teal-800">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Shipping and Payment Form */}
        <div className="mt-10">
          <form onSubmit={handleSubmit}>
            <h2 className="text-xl font-bold text-teal-700 mb-4">Shipping Address</h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block text-gray-700">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>
              <div>
                <label className="block text-gray-700">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>
              <div>
                <label className="block text-gray-700">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>
              <div>
                <label className="block text-gray-700">Zip Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>
              <div>
                <label className="block text-gray-700">Phone Number</label>
                <input
                  type="number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>
            </div>

            {/* Payment Method */}
            <h2 className="text-xl font-bold text-teal-700 mt-8 mb-4">Payment Method</h2>

            <div className="flex space-x-4">
              <div className="flex items-center">
                <input type="radio" id="upi" name="paymentMethod" className="h-4 w-4 text-teal-600" onChange={handleChange} value="upi" checked={formData.paymentMethod==="upi"} />
                <label htmlFor="upi" className="ml-2 text-gray-700">UPI</label>
              </div>
              <div className="flex items-center">
                <input type="radio" id="card" name="paymentMethod" className="h-4 w-4 text-teal-600"  onChange={handleChange} value="card" checked={formData.paymentMethod==="card"} />
                <label htmlFor="card" className="ml-2 text-gray-700">Card</label>
              </div>
              <div className="flex items-center">
                <input type="radio" id="cod" name="paymentMethod" className="h-4 w-4 text-teal-600"  onChange={handleChange} value="cash" checked={formData.paymentMethod==="cash"}/>
                <label htmlFor="cod" className="ml-2 text-gray-700">Cash on Delivery</label>
              </div>
            </div>

            {/* Place Order Button */}
            <div className="mt-8">
              <button
                type="submit"
                className="w-full bg-teal-700 text-white py-2 px-4 rounded-lg hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-600"
              >
                Place Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;
