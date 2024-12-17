import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UserDetails = () => {
  const [user, setUser] = useState({});
  const { userid } = useParams();
  const [orderDtls,setOrderDtls]=useState([])
  
const fetchOrderbyUser=()=>{
  axios.get(`https://localhost:7151/api/Order/GetOrderByUserId/${userid}`,
    {
      headers:{
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`
      }
    })
    .then((res)=>{
      console.log("fetch order", res.data.data)
      setOrderDtls(res.data.data)
    })
    .catch((err)=>{
      console.log("fetch order", err)
    })
}
const fetchUser=()=>{
  axios
  .get(`https://localhost:7151/api/User/${userid}`,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    },
  })
  .then((res) => setUser(res.data.data))
  .catch((err) => console.log('fetching error', err)); 
}

  useEffect(() => {
    fetchUser();
      fetchOrderbyUser();
  }, []);


  const handleBlock=async()=>{
    await axios.patch(`https://localhost:7151/api/User/BlockOrUnBlock/${userid}`,{},{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    })
    console.log ("block handled",user)
    fetchUser();
  }



  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        {/* User Info */}
        <div className="border-b pb-4 mb-6">
          <h2 className="text-2xl font-semibold text-teal-800">
            User ID: {user.id}
          </h2>
          <p className="text-teal-700 mt-2">
            <span className="font-medium">Name:</span> {user.name}
          </p>
          <p className="text-teal-700 truncate">
            <span className="font-medium">Email:</span> {user.email}
          </p>
          <div className='mt-2 flex justify-center'>
            <button onClick={handleBlock}
            className={`${user.isBlocked?'bg-teal-800':'bg-red-800'} py-2 w-full rounded text-white text-xl font-semibold`}>
            {user.isBlocked?'UnBlock':'Block'}</button>
          </div>
        </div>

        <div className="bg-white max-h-[650px] rounded-xl shadow-md border border-gray-200  w-full space-y-5 p-4 overflow-auto scrollbarHidden">
        <h1 className="text-teal-800 font-semibold text-center text-2xl mt-4">Order Details</h1>

        {orderDtls.length === 0 ? (
          <div className="flex flex-col items-center text-center py-12 px-6 rounded-lg space-y-4 bg-gray-50 shadow-sm">
            {/* <FaBoxOpen className="h-16 w-16 text-gray-400" /> */}
            <p className="text-primary font-medium text-lg">No Orders</p>
          </div>
        ) : null}

        {/* Order Details */}
        {orderDtls.map((order, index) => {
              return (
                <div
                  key={index}
                  className="bg-gray-50 p-6 rounded-lg shadow-md border border-teal-700"
                >
                  {/* Order Information */}
                  <div className="text-sm space-y-2 text-gray-700">
                    <p>
                      <span className="font-medium text-teal-700">Order ID: </span>
                      <span className="font-semibold ">{order.orderId}</span>
                    </p>
                    <p>
                      <span className="font-medium text-teal-700">Order Date: </span>
                      <span className="font-semibold ">
                        {order.orderDate.substring(0, 10)}
                      </span>
                    </p>
                    <p>
                      <span className="font-medium text-teal-700">Transaction ID: </span>
                      <span className="font-semibold ">{order.transactionId}</span>
                    </p>
                  </div>

                  {/* Product Information */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
                    {order.orderProducts.map((item, idx) => {
                      return (
                        <div
                          key={idx}
                          className="p-4 bg-gray-50 rounded-lg shadow-sm border border-teal-700 hover:shadow-md transition-shadow"
                        >
                          <h3 className="font-medium text-teal-700 truncate">
                            {item.productName}
                          </h3>
                          <p className="text-teal-700 text-sm">
                            Quantity: <span className="font-semibold">{item.quantity}</span>
                          </p>
                          <p className="text-teal-700 text-sm">
                            Price: <span className="font-semibold">${item.price}</span>
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

 
         </div>

      </div>
    </div>
  );
};

export default UserDetails;
