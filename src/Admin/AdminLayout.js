import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FaChartBar, FaList, FaUsers, FaPlus } from 'react-icons/fa';
import { TbLogout2 } from 'react-icons/tb';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import axios from 'axios';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [admin,setAdmin] =useState(false)
  const [showLogout,setShowLogout]=useState(false)
  const navigate=useNavigate()
  const id=localStorage.getItem("adminId")
 
  

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout=()=>{
    localStorage.clear()
    navigate("/")
  }

  useEffect(()=>{
    axios.get(`http://localhost:3001/users/${id}`)
    .then((res) => {
      console.log(res.data?.isAdmin); 
      if (res.data?.isAdmin) {
        setAdmin(true); 
      }
    })
      .catch(err=>console.log("error occured",err))
    
  },[id])
  console.log(admin)
  if(!id && !admin){
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center p-8 bg-white shadow rounded">
          <h1 className="text-4xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-600">You do not have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      {/* Toggle Button for Mobile */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden text-teal-800 p-2 bg-white rounded-full shadow-lg"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-teal-800 p-5 text-white w-20 lg:w-64 shadow-lg z-40 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        {/* Logo */}
        <div className="mb-8">
          <img src={logo} alt="logo" className="w-10 lg:w-32 h-10 lg:h-12" />
        </div>

        {/* Navigation Links */}
        <ul className="space-y-4">
          <li>
            <NavLink
              to="dashboard"
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded ${
                  isActive ? 'bg-teal-700' : 'hover:bg-teal-700'
                }`
              }
            >
              <FaChartBar className="text-xl" />
              <span className="hidden lg:inline">Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="productlist"
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded ${
                  isActive ? 'bg-teal-700' : 'hover:bg-teal-700'
                }`
              }
            >
              <FaList className="text-2xl" />
              <span className="hidden lg:inline">Category</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="userlist"
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded ${
                  isActive ? 'bg-teal-700' : 'hover:bg-teal-700'
                }`
              }
            >
              <FaUsers className="text-2xl" />
              <span className="hidden lg:inline">Users List</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="addproducts"
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded ${
                  isActive ? 'bg-teal-700' : 'hover:bg-teal-700'
                }`
              }
            >
              <FaPlus className="text-2xl" />
              <span className="hidden lg:inline">Add Product</span>
            </NavLink>
          </li>
          <li>
            <button onClick={()=>setShowLogout(!showLogout)}
             className="flex items-center gap-2 p-2 w-full rounded bg-teal-800 hover:bg-teal-700">
              <TbLogout2 className="text-2xl" />
              <span className="hidden lg:inline">Logout</span>
            </button>
          </li>
        </ul>
      </div>
      {showLogout ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full border border-gray-200">
            <h1 className="text-xl font-semibold text-teal-800 mb-4">Are You Sure?</h1>
            <div className="flex justify-end gap-4">
              <button 
                onClick={handleLogout}
                className="px-4 py-2 bg-teal-800 text-white rounded-md hover:bg-teal-900 focus:outline-none focus:ring-2 focus:ring-teal-600 transition duration-300"
              >
                Yes, I'm
              </button>
              <button
                onClick={() => setShowLogout(!showLogout)}
                className="px-4 py-2 bg-gray-100 text-teal-800 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-600 transition duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}



      {/* Main Content Area */}
      <div
        className={`flex-1 p-8 bg-gray-100 overflow-auto transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'ml-20 md:ml-64' : 'md:ml-64'
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;



