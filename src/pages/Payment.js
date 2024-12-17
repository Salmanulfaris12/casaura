import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { fetchAddress } from '../Redux/Slices/AddressSlice';
import { useCart} from '../Context/Cartcontext';


const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const Payment = () => {
  const {getcart,cart,setCart}=useCart();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const dispatch =useDispatch()
  const navigate=useNavigate()
  const {address} = useSelector(state => state.address);

  const handleDropdownChange = (event) => {
    const selectedId = Number(event.target.value);
    const selectedAddr = address.find((addr) => addr.addressId === selectedId);
    setSelectedAddress(selectedAddr);
  };
  console.log("addres in payment", address)

  const [razor, setRazor] = useState(null);
  const [isRazorpay, setIsRazorpay] = useState(false);

  const handleConfirmPayment = async (values)=>{
  if(!isRazorpay){
    const scriptLoaded = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
    setIsRazorpay(scriptLoaded);

    if(!scriptLoaded){
      alert("Failed to load payment gateway. Please try again later");
      return;
    }
  }

  if (!selectedAddress) {
    alert("An Address need to be selected");
    return;
  }
 

  try{
    // create order id
    const res = await axios.post(`https://localhost:7151/api/Order/order-create?price=${cart.totalPrice}`,
      {},
      {
        headers:{
          Authorization: `Bearer ${localStorage.getItem("userToken")}`
        }
      }
    );
    
    const orderId = res.data;
    console.log("order id", orderId);

    // add razorpay options
    
    const options = {
      key: "rzp_test_JtEUXj0BHIAbcC", // Razorpay API key
      amount: cart.totalPrice * 100, // amount in paise
      currency: "INR",
      name: "CasaAura",
      description: "Order Payment",
      order_id: orderId,
      handler: async function (response) {
        console.log("options==>",response);

        const paymentData = {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature
        };

        setRazor(paymentData);

        try{

          await axios.post("https://localhost:7151/api/Order/payment",
            paymentData,
            {
              headers:{
                Authorization: `Bearer ${localStorage.getItem("userToken")}`
              }
            });
            

          await axios.post("https://localhost:7151/api/Order/placeOrder",
            {
              addressId: selectedAddress.addressId,
              totalPrice: cart.totalPrice,
              orderString: response.razorpay_order_id,
              transactionId: response.razorpay_payment_id
            },
            {
              headers:{
                Authorization: `Bearer ${localStorage.getItem("userToken")}`
              }
            });

              alert("Order placed successfully!");
              const updatedcart =getcart()
              setCart(updatedcart)
              navigate('/');
        }
        catch(error){
          console.log("==>",error.response)
          alert(error.response)
        }
      },

      theme: {
        color: "#115e59"
      }
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();

  }
  catch(error){
    console.log("===>",error);
    alert("Error creating order. Please try again.");
  }
}


useEffect(()=>{
dispatch(fetchAddress())
},[])

  return (
      <div className='container mx-auto py-12 px-4 bg-gray-100 '>
        <div className={`flex flex-col md:flex-row p-4 justify-between max-w-7xl mx-5 md:mt-14 mt-64 `}>


        {/* Delivery Address */}
        <div className={`w-full md:w-1/2 bg-white p-6 rounded-lg shadow-lg `}>
          <h2  className="text-2xl text-teal-700 font-bold mb-6">
            Delivery Address
          </h2>


          <div className="p-6 max-w-md mx-auto bg-white shadow rounded-lg space-y-4">
            <h2 style={{ color: "#052560" }} className="text-lg font-semibold text-gray-700">Select an Address</h2>
              <div className="space-y-3">
                <select
                  onChange={handleDropdownChange}
                  className="w-full border border-gray-300 rounded-lg p-2"
                  defaultValue=""
                  >
                  <option value="" disabled>
                    Choose an address
                  </option>
                  {address.map((address, index) => (
                    <option key={address.addressId} value={address.addressId}>
                      Address : {index+1}
                    </option>
                  ))}
                </select>

                <button
                  onClick={()=> navigate('/address')}
                  className="w-full bg-teal-700 text-white py-2 mt-6 rounded-lg hover:bg-teal-600">
                  Add New Address
                </button>
              </div>

              {selectedAddress && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
                  <h3 className="font-bold text-teal-700">Selected Address Details</h3>
                  <p>
                    <span className="font-medium text-teal-700">Full Name:</span>{" "}
                    {selectedAddress.fullName}
                  </p>
                  <p>
                    <span className="font-medium text-teal-700">House Name:</span>{" "}
                    {selectedAddress.houseName}
                  </p>
                  <p>
                    <span className="font-medium text-teal-700">Landmark:</span>{" "}
                    {selectedAddress.landMark}
                  </p>
                  <p>
                    <span className="font-medium text-teal-700">Phone Number:</span>{" "}
                    {selectedAddress.phoneNumber}
                  </p>
                  <p>
                    <span className="font-medium text-teal-700">Pincode:</span>{" "}
                    {selectedAddress.pincode}
                  </p>
                  <p>
                    <span className="font-medium text-teal-700">Place:</span>{" "}
                    {selectedAddress.place}
                  </p>
                  <p>
                    <span className="font-medium text-teal-700">Post Office:</span>{" "}
                    {selectedAddress.postOffice}
                  </p>
                </div>
              )}
          </div>


          
        </div>

        {/* Right Side: Payment Section */}
        <div className={`w-full md:w-1/2 bg-white p-6 rounded-lg shadow-lg mt-8 md:mt-0 md:ml-4`}>
          <h2 className="text-2xl text-teal-700 font-bold mb-6">
            Order Summary
          </h2>
          <p className="text-lg font-semibold mb-4 bg-slate-100 p-2 rounded-lg">
            Total Items: ₹ {cart.totalItem}
          </p>
          <p className="text-lg font-semibold mb-4 bg-slate-300 p-2 rounded-lg">
            Final Price: ₹ {cart.totalPrice}
          </p>

          <button
            onClick={handleConfirmPayment}
            type="button"
            className="w-full bg-teal-700 text-white py-2 mt-6 rounded-lg hover:bg-teal-700"
          >
            Confirm Payment
          </button>
        </div>
        </div>
        </div>
  );
};

export default Payment;
