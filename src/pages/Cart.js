import React, { useState } from 'react';
import axios from 'axios';
import emptycart from '../assets/pngwing.com.png'
import { CiSquareMinus,CiSquarePlus } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Context/Cartcontext';

const Cart = () => {
    const {cart,setCart,getcart}=useCart()
    const [errors,setErrors]=useState([])
    const userToken = localStorage.getItem("userToken");
    const navigate=useNavigate()

    console.log("User Token:", userToken);
    console.log("cart usecontext",cart);
    


    const handleDelete = async (productid) => {
        try {
            const response = await axios.delete(
                `https://localhost:7151/api/Cart/Delete/${productid}`,
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`, 
                    },
                }
            );
            console.log("Deleted item from cart:", response.data);
    
           
            const updatedCart = await getcart(); 
            console.log("updated cart in delete",updatedCart);
            
            setCart(updatedCart);
        } catch (err) {
            console.error("Error deleting product from cart:", err.response?.data || err.message);
        }
    };

    const handleDecrementQuantity= async (productid)=>{
        try{
            const response = await axios.put(
                `https://localhost:7151/api/Cart/DecreaseQty/${productid}`,{productid},
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`, 
                    },
                }
            );
            console.log("quatity decreased", response.data);
    
         
            const updatedCart = await getcart();
            console.log("updated cart in quantity decrement",updatedCart);
            
            setCart(updatedCart);
            setErrors([])
        }catch (err) {
            console.error("Error decreasing quantity of product from cart:", err.response?.data || err.message);
        }
    }
    const handleIncrementQuantity= async (productid,quantity)=>{
        if(quantity == 10){
            alert("Maximum quantity limit reached..!!")
          }
        try{
            const response = await axios.put(
                `https://localhost:7151/api/Cart/IncreaseQty/${productid}`,{productid},
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`, 
                    },
                }
            );
            console.log("quatity increased", response.data);
    
            // Update the cart after deletion
            const updatedCart = await getcart(); // Ensure this function works and updates the cart
            console.log("updated cart in quantity",updatedCart);
            
            setCart(updatedCart);
        }catch (err) {
            console.error("Error increasing quantiy of product from cart:", err.response?.data || err.message);
            setErrors(err.response.data.error);
        }
    }

    const handleProceed = () => {
        if (userToken) {
          navigate('/payment');  
        } else {
          navigate('/login');  
        }
      };

    return (
        <div className="container mx-auto py-12 px-4 bg-gray-100 ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                {/* Cart Items */}
                <div className="md:col-span-2">
                    {cart.totalItem>0? (
                        cart.cartItemsperUser.map((products) => (
                            <div key={products.productId} className="flex items-center justify-between bg-white shadow-xl p-6 rounded-lg mb-6">
                                {/* Product Image */}
                                <div className="w-24">
                                    <img className="rounded-lg object-cover" src={products.image} alt={products.productName} />
                                </div>

                                {/* Product Details */}
                                <div className="flex-1 ml-6">
                                    <h2 className="text-xl font-semibold text-teal-800">{products.productName}</h2>
                                    <p className="text-neutral-600 mt-2">{products.price}</p>
                                    <span className='flex space-x-1 align-middle'>
                                        <span className='text-base'>Quantity:</span>
                                        <div className='text-lg relative top-1 hover:scale-105 transition-transform cursor-pointer' onClick={()=>handleDecrementQuantity(products.productId)} ><CiSquareMinus /></div>
                                        <span className='text-lg font-bold'>{products.quantity}</span>
                                        <div className='text-lg relative top-1 hover:scale-105 transition-transform cursor-pointer' onClick={()=>handleIncrementQuantity(products.productId, products.quantity)}><CiSquarePlus /></div>
                                    </span>
                                    {errors && <p className="text-red-500 text-s mt-1">{errors}</p>}
                                </div>

                                {/* Delete Button */}
                                <button className="bg-red-700 hover:bg-red-800 text-white py-2 px-4 rounded-lg"
                                onClick={()=>handleDelete(products.productId)}>
                                    Delete
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12">
                        <img src={emptycart} className="w-48 h-48 mb-4" alt="Empty Cart" />
                        <p className="text-xl text-gray-600">Your cart is empty!</p>
                        <p className="text-sm text-gray-500 mt-2">
                          It looks like you haven't added anything to your cart yet.
                        </p>
                      </div>
                    )}
                </div>
                </div>

                {/* Cart Summary */}
                {cart.totalItem>0?(
                <div className="bg-white shadow-lg p-6 rounded-lg">
                    <h1 className="text-2xl font-bold text-teal-800 mb-6">Cart Summary</h1>
                    <div className="flex justify-between mb-4">
                        <span className="text-teal-900">TotalItems</span>
                        <span className="font-semibold">{cart.totalItem}</span>
                    </div>
 
                     <div className="flex justify-between text-teal-800 text-xl font-semibold">
                        <span>TotalAmount</span>
                        <span>₹{cart.totalPrice}</span>
                    </div>

                    <button onClick={handleProceed}
                    className="w-full bg-teal-800 text-2xl text-white py-3 px-4 rounded-lg mt-6 hover:bg-primary-dark transition duration-300 ease-in-out">
                        Proceed To Payment
                    </button>
                </div>
                ):(null)
            } 
            {/* </div> */}
        </div>
    );
}

export default Cart;
