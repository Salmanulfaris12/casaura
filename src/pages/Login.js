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

  useEffect((user)=>{
    const storeduser= localStorage.getItem("user")
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Fetch users from the JSON server and check if the credentials match
      axios.get("http://localhost:3001/users")
        .then((res) => {
          const users = res.data;
          const user = users.find(
            (user) => user.email === formData.email && user.password === formData.password
          );
          const isAdmin=user.isAdmin; 
          if(isAdmin){
            console.log("Admin login successfull:",user)
            localStorage.setItem("adminId",user.id)
            navigate("/admin")
          }
          else if (user && user.isAllowed) {
            console.log("Login successful:", user);

            localStorage.setItem("userId",user.id)
            setFormData({
                email: '',
                password: ''
            })
            navigate("/",{replace:true})
            // alert("Login Successfull")
          }else if(!user.isAllowed){
            setErrors({login:"You restricted or Blocked"})
          }
           else {
            setErrors({ login: "Invalid email or password" });
          }
        })
        .catch((err) => {
          console.log("Error fetching users:", err);
        });
    }
  };

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

