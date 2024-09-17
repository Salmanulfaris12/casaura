import { useEffect, useState } from 'react';
import React from 'react';
import { NavLink, useNavigate} from "react-router-dom"
import logo from '../assets/logo.png';
import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';
import axios from 'axios';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cart,setCart]=useState([])
  const navigate=useNavigate()
  const userId=localStorage.getItem("userId")
  
  const [search,setSearch]=useState("")
  const [items,setItems]=useState([])
  const [filtered,setFiltered]=useState([])


  useEffect(()=>{
    if(userId){
    axios.get(`http://localhost:3001/users/${userId}`)
    .then((res)=>{setCart(res.data.cart)
    })
    .catch((err)=>console.log(err))
  }
 
  },[cart,userId])

  const handleClick=()=>{
    navigate("/cart")
  }
  useEffect(()=>{
    axios.get("http://localhost:3001/products")
    .then((res)=>setItems(res.data))
    .catch((err)=>console.log("fetching error",err))
},[])
  
  useEffect(()=>{
    setFiltered(items.filter((item)=>item.category.toLowerCase().includes(search.toLowerCase())))
  },[items,search])

  const handleProductClick = (id) => {
    navigate(`/${id}`)
}

  return (
    <nav className="fixed w-[100%] bg-teal-800 shadow-md z-10">
      <div className="max-w-7xl mx-11 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img src={logo} alt="logo" className="w-32 h-12" />
          </div>

          {/* Menu Links and Icons */}
          <div className="hidden lg:flex items-center space-x-4">
            <NavLink to="/" className="text-white opacity-100 hover:opacity-80 px-3 py-2 rounded-md text-lg font-medium">Home</NavLink>
            <NavLink to="/category" className="text-white opacity-100 hover:opacity-80 px-3 py-2 rounded-md text-lg font-medium">Categories</NavLink>
            <NavLink to="/store" className="text-white opacity-100 hover:opacity-80 px-3 py-2 rounded-md text-lg font-medium">Store</NavLink>

            <div className="hidden sm:flex flex-1 mx-4">
            <div className="relative">
              <input
                type="text"
                onChange={(e)=>setSearch(e.target.value)}
                placeholder="Search"
                className="block w-60 placeholder-white  pr-3 py-1 text-md text-white border-b border-white rounded-none bg-transparent shadow-none focus:outline-none focus:ring-0 focus:border-white focus:w-96  transition-all duration-300 ease-in-out"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pl-3">
                <FaSearch className="h-5 w-5 text-white" />
              </div>
              <div style={{display:{filtered}?'hidden':'block'}}
              className=" w-full max-h-40 absolute z-50 bg-white rounded-md shadow-md mt-2 overflow-auto scroll-bar-hidden">
                <ul>
                  {filtered.length !== items.length ? (
                    filtered.map((item) => (
                      <li
                        key={item.id}
                        onClick={() =>handleProductClick(item.id)} 
                        className="p-2 cursor-pointer hover:bg-gray-100"
                      >
                        <strong className='text-teal-800'>{item.name}</strong>
                        <p className="text-gray-500">{item.category}</p>
                      </li>
                    ))
                  ):(null)}
                </ul>
              </div>
            </div>
          </div>

            <button className="text-white hover:text-gray-200 p-1 relative"
            onClick={handleClick}>
              {userId && cart.length > 0 ? (
                <div className='h-4 w-4 bg-red-800 text-xs rounded-full font-bold absolute top-0 right-0'>{cart.length}</div>
              ):(null)}
              <FaShoppingCart className="h-6 w-6" />
            </button>
            
            { userId ? (
            <div className="relative">
              <button
                onClick={() => navigate("/profile")}
                className="text-white hover:text-gray-200 flex items-center"
              >
                <FaUser className="h-6 w-6" />
              </button>
              </div>
            ):(         
              <NavLink to="/login" className="text-white opacity-100 hover:opacity-80 px-3 py-2 rounded-md text-lg font-medium">
              Login
            </NavLink>)}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-teal-800 hover:bg-gray-100 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="md:hidden flex justify-center">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 ">

                <div className="flex flex-1 mx-4 m-7">
                <div className="relative">
                  <input
                    onChange={(e)=>setSearch(e.target.value)}
                    type="text"
                    placeholder="Search"
                    className="block w-60 placeholder-white pr-3 py-1 text-white border-b border-white rounded-none bg-transparent shadow-none focus:outline-none focus:ring-0 focus:border-white focus:w-96 sm:text-xs transition-all duration-300 ease-in-out"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pl-3">
                    <FaSearch className="h-5 w-5 text-white" />
                  </div>
                  <div style={{display:{filtered}?'hidden':'block'}}
                  className=" w-full max-h-40 absolute z-50 bg-white rounded-md shadow-md mt-2 overflow-auto scroll-bar-hidden">
                    <ul>
                      {filtered.length !== items.length ? (
                        filtered.map((item) => (
                          <li
                            key={item.id}
                            onClick={() =>handleProductClick(item.id)} 
                            className="p-2 cursor-pointer hover:bg-gray-100"
                          >
                            <strong className='text-teal-800'>{item.name}</strong>
                            <p className="text-gray-500">{item.category}</p>
                          </li>
                        ))
                      ):(null)}
                    </ul>
                  </div>
                </div>
              </div>
              <NavLink to="/" className="text-white block px-3 py-2 rounded-md text-center font-medium">Home</NavLink>
              <a href="#categories-section" className="text-white block px-3 py-2 rounded-md text-center font-medium">Categories</a>
              <NavLink to="/store" className="text-white block px-3 py-2 rounded-md text-center font-medium">Store</NavLink>


           

              <div className="flex items-center space-x-4 mt-4 justify-center">
                <button className="text-white hover:text-gray-200 p-1 relative"
                  onClick={handleClick}>
                  {(userId && cart.length > 0) ? (
                    <div className='h-4 w-4 bg-red-800 text-xs rounded-full font-bold absolute top-0 right-0'>{cart.length}</div>
                  ):(null)}
                  <FaShoppingCart className="h-6 w-6" />
                </button>
                  {userId?(
                <div className="relative">
                  <button
                    onClick={() =>navigate("/profile")}
                    className="text-white hover:text-gray-200 flex items-center "
                  >
                    <FaUser className="h-6 w-6" />
                  </button>
                </div>
              ):(         
              <NavLink to="/login" className="text-white opacity-100 hover:opacity-80 px-3 py-2 rounded-md text-lg font-medium">
              Login
            </NavLink>)}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
