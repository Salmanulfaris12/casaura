import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from "../assets/logo2.png";
import { NavLink,useNavigate } from 'react-router-dom';


const Login = () => {

  const navigate=useNavigate()  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const adminId =localStorage.getItem("adminToken")

  useEffect(()=>{
    const storeduser= localStorage.getItem("userToken")
    if(storeduser){
        navigate("/",{replace:true})
    }
  },[navigate])

  const validate = () => {
    const errors = {};
    if (!formData.email) errors.email = "Email is Required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Invalid Email";
    if (!formData.password) errors.password = "Password is Required";
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    try {
      console.log("Submitting login request with:", formData);
      const response = await axios.post(
        "https://localhost:7151/api/Auth/Login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      const users = response.data.data;
      if (users.role === "admin") {
        console.log("Admin login successful:", users);
        localStorage.setItem("adminToken", users.token);
        navigate("/admin");
      } else if (users && !users.isBlocked) {
        console.log("User login successful:", users);
        localStorage.setItem("userToken", users.token);
        localStorage.setItem("name", users.name);
        localStorage.setItem("email", users.email);
        setFormData({ email: "", password: "" });
        navigate("/", { replace: true });}
    } catch (err) {
      console.error("Error fetching users:", err.response?.data || err.message);
      setErrors({ login: `${err.response?.data.error}` });
    }
  };
  

  useEffect(()=>{
    if(adminId){
      navigate("/admin")
    }
    console.log("kkkk");
    
  },[adminId])
  return (
    <div className='min-h-screen bg-teal-800 flex items-center justify-center'>
      <div className='w-full max-w-md bg-white p-8 rounded-lg shadow-lg'>
        <div className='flex justify-center mb-3'>
          <img src={logo} alt="logo" className="w-40 h-auto " />
        </div>
        <h2 className='text-2xl font-bold mb-6 text-center text-teal-800'>Log In</h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label htmlFor='email' className='block text-gray-700'>Email</label>
            <input
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm ${errors.email ? 'border-red-500' : ''}`}
              placeholder='Your Email'
              required
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor='password' className='block text-gray-700'>Password</label>
            <input
              type='password'
              id='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm ${errors.password ? 'border-red-500' : ''}`}
              placeholder='Your Password'
              required
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>
          <div>
            <button
              type='submit'
              className='w-full py-2 px-4 bg-teal-800 text-white font-semibold rounded-md shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500'>
              Log In
            </button>
            {errors.login && <p className="text-red-500 text-md mt-2">{errors.login}</p>}
          </div>
        </form>
        <div className='mt-1'>
            <span className='text-lg font-normal'>Don't have a account? </span><NavLink className='text-teal-700' to="/sign-up">Sign up</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;

