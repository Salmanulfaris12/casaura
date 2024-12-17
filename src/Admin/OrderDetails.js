import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderDetails = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    axios
      .get("https://localhost:7151/api/Order/get-order-details-admin", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
      .then((res) => {
        console.log("orders..", res.data);
        setOrders(res.data);
        setFilteredOrders(res.data); // Initial state for filtering
      })
      .catch((err) => console.log("error in fetching orders", err));
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    axios
      .patch(
        `https://localhost:7151/api/Order/update-orderstatus?orderId=${orderId}&orderStatus=${newStatus}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      )
      .then(() => {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.orderId === orderId ? { ...order, orderStatus: newStatus } : order
          )
        );
        setFilteredOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.orderId === orderId ? { ...order, orderStatus: newStatus } : order
          )
        );
      })
      .catch((err) => console.log("Error updating status", err));
  };

  const handleFilterChange = (e) => {
    const selectedStatus = e.target.value;
    setStatusFilter(selectedStatus);
    if (selectedStatus) {
      setFilteredOrders(orders.filter((order) => order.orderStatus === selectedStatus));
    } else {
      setFilteredOrders(orders);
    }
  };

  const handleStatusSelect = (orderId, e) => {
    const newStatus = e.target.value;
    if (newStatus) {
      handleStatusChange(orderId, newStatus);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-teal-800">Order Details</h1>
          <select
            className="border border-teal-700 rounded px-3 py-2 text-teal-800"
            value={statusFilter}
            onChange={handleFilterChange}
          >
            <option value="">All Orders</option>
            <option value="pending">Pending</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>

        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order.orderId}
              className="bg-gray-100 text-teal-800 p-4 rounded-lg shadow-md border border-teal-700"
            >
              <h2 className="text-lg font-semibold">Order ID: {order.orderId}</h2>
              <p>Customer Name: {order.customerName}</p>
              <p>Customer Email: {order.customerEmail}</p>
              <p>Order Status: {order.orderStatus}</p>
              <p>Order Date: {order.orderDate.substring(0, 10)}</p>
              <p>Transaction ID: {order.transactionId}</p>

              <div className="mt-4">
                <label htmlFor={`status-select-${order.orderId}`} className="block text-sm font-medium">
                  Update Status:
                </label>
                <select
                  id={`status-select-${order.orderId}`}
                  className="border bg-teal-800 border-teal-700 rounded px-3 py-2 text-white align-center w-1/3"
                  defaultValue={order.orderStatus}
                  onChange={(e) => handleStatusSelect(order.orderId, e)}
                >
                  <option value="pending">Pending</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;

