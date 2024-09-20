import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { NavLink, Outlet } from 'react-router-dom';
import { FaHome, FaList, FaUsers, FaPlus } from 'react-icons/fa';
import { TbLogout2 } from 'react-icons/tb';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout=()=>{
    
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
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded ${
                  isActive ? 'bg-teal-700' : 'hover:bg-teal-700'
                }`
              }
            >
              <FaHome className="text-2xl" />
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
            <button className="flex items-center gap-2 p-2 w-full rounded bg-teal-800 hover:bg-teal-700">
              <TbLogout2 className="text-2xl" />
              <span className="hidden lg:inline">Logout</span>
            </button>
          </li>
        </ul>
      </div>

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



