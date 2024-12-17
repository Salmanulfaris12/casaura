// Navbar.js
import { useEffect, useState } from 'react';
import React from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import logo from '../assets/logo.png';
import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';
import axios from 'axios';
import { FaHeart } from "react-icons/fa6";
import { useSelector,useDispatch } from 'react-redux';
import { useCart} from '../Context/Cartcontext';
import { fetchWishlist } from '../Redux/Slices/WishListSlice';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useCart(); // Get cart from context
  const navigate = useNavigate();
  const userId = localStorage.getItem("userToken");
  const {wishlist}=useSelector(state=>state.wishlist)
  const [search, setSearch] = useState("");
  const [items, setItems] = useState([]);
  const dispatch=useDispatch();
  // const [filtered, setFiltered] = useState([]);

  const handleClick = () => {
    navigate("/cart");
  };

  useEffect(() => {
    if(!search){
      setItems([])
      return
    }

  
    axios.get(`https://localhost:7151/api/Product/search-item?search=${search}`)
      .then((res) =>{console.log(res.data)
         setItems(res.data || [])
      })
      .catch((err) => console.log("fetching error", err));
  }, [search]);

  useEffect(()=>{
    if(userId){
      dispatch(fetchWishlist)
    }
  },[dispatch,userId])
  
  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  const handleWishlist = ()=>{
    if(userId) navigate('/wishlist');
    else navigate('/login');
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
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search"
                  className="block w-60 placeholder-white  pr-3 py-1 text-md text-white border-b border-white rounded-none bg-transparent shadow-none focus:outline-none focus:ring-0 focus:border-white focus:w-96  transition-all duration-300 ease-in-out"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pl-3">
                  <FaSearch className="h-5 w-5 text-white" />
                </div>
                <div style={{ display:  items.length>0  ? 'hidden' : 'block' }}
                  className=" w-full max-h-40 absolute z-50 bg-white rounded-md shadow-md mt-2 overflow-auto scroll-bar-hidden">
                  <ul>
                    {items.length !== 0 ? (
                      items.map((item) => (
                        <li
                          key={item.productId}
                          onClick={() => handleProductClick(item.ProductId)}
                          className="p-2 cursor-pointer hover:bg-gray-100"
                        >
                          <strong className='text-teal-800'>{item.productName}</strong>
                          <p className="text-gray-500">{item.category}</p>
                        </li>
                      ))
                    ) : (null)} 
                  </ul>
                </div>
              </div>
            </div>

            <button className="text-white hover:text-gray-200 p-1 relative"
              onClick={handleClick}>
              {userId && cart.totalItem > 0 ? (
                <div className='h-4 w-4 bg-red-800 text-xs rounded-full font-bold absolute top-0 right-0'>{cart.totalItem}</div>
              ) : (null)}
              <FaShoppingCart className="h-6 w-6" />
            </button>

            <button onClick={handleWishlist} className="text-white hover:text-gray-200 p-1 relative">
                {(userId && wishlist.length != 0) ? (
                  <div className="h-4 w-4 bg-red-800 text-xs rounded-full font-bold absolute top-0 right-0">{wishlist.length}</div>
                ):(null)
                }
                <FaHeart className="h-6 w-6 text-white" />
                <p className="text-white"></p>
            </button>

            {userId ? (
              <div className="relative">
                <button
                  onClick={() => navigate("/profile")}
                  className="text-white hover:text-gray-200 flex items-center"
                >
                  <FaUser className="h-6 w-6" />
                </button>
              </div>
            ) : (
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
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    placeholder="Search"
                    className="block w-60 placeholder-white pr-3 py-1 text-white border-b border-white rounded-none bg-transparent shadow-none focus:outline-none focus:ring-0 focus:border-white focus:w-96 sm:text-xs transition-all duration-300 ease-in-out"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pl-3">
                    <FaSearch className="h-5 w-5 text-white" />
                  </div>
                  <div style={{ display: { items } ? 'hidden' : 'block' }}
                    className=" w-full max-h-40 absolute z-50 bg-white rounded-md shadow-md mt-2 overflow-auto scroll-bar-hidden">
                    <ul>
                      {items.length !== 0 ? (
                        items.map((item) => (
                          <li
                            key={item.id}
                            onClick={() => handleProductClick(item.id)}
                            className="p-2 cursor-pointer hover:bg-gray-100"
                          >
                            <strong className='text-teal-800'>{item.name}</strong>
                            <p className="text-gray-500">{item.category}</p>
                          </li>
                        ))
                      ) : (null)}
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
                  {(userId && cart.totalItem > 0) ? (
                    <div className='h-4 w-4 bg-red-800 text-xs rounded-full font-bold absolute top-0 right-0'>{cart.totalItem}</div>
                  ) : (null)}
                  <FaShoppingCart className="h-6 w-6" />
                </button>
                <button onClick={handleWishlist} className="text-white hover:text-gray-200 p-1 relative">
                {(userId && wishlist.length != 0) ? (
                  <div className="h-4 w-4 bg-red-800 text-xs rounded-full font-bold absolute top-0 right-0">{wishlist.length}</div>
                ):(null)
                }
                <FaHeart className="h-6 w-6 text-white" />
                <p className="text-white"></p>
            </button>
                {userId ? (
                  <div className="relative">
                    <button
                      onClick={() => navigate("/profile")}
                      className="text-white hover:text-gray-200 flex items-center "
                    >
                      <FaUser className="h-6 w-6" />
                    </button>
                  </div>
                ) : (
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

