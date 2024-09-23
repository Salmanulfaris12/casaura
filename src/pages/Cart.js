import React, { useEffect, useState } from 'react';
import axios from 'axios';
import emptycart from '../assets/pngwing.com.png'
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Context/Cartcontext';

const Cart = () => {
    const {setCart}=useCart()
    const [item, setItem] = useState([]);
    const userId = localStorage.getItem("userId");
    const navigate=useNavigate()

    useEffect(() => {
        if(userId){
        axios.get(`http://localhost:3001/users/${userId}`)
            .then((res) => {
                setItem(res.data.cart);
            })
            .catch((err) => console.log("fetching error...", err));
        }
    }, [userId]);

     const calculateSubTotal=()=>{
        return item.reduce((total,ele)=>total+ele.price*ele.quantity,0)
     }
     const calculateDiscount=()=>{
        return calculateSubTotal()*0.05
     }
     const calGrandTotal=()=>{
        return calculateSubTotal()-calculateDiscount()
     }

    const handleDelete=async(id)=>{
       const removedCart=item.filter((item)=>item.id!==id)
       setItem(removedCart)

       await axios.patch(`http://localhost:3001/users/${userId}`,{cart:removedCart})
       setCart(removedCart)

    }
    const handleProceed = () => {
        if (userId) {
          navigate('/payment');  // Navigate to payment if userId exists
        } else {
          navigate('/login');    // Navigate to login if userId does not exist
        }
      };

    return (
        <div className="container mx-auto py-12 px-4 bg-gray-100 ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                {/* Cart Items */}
                <div className="md:col-span-2">
                    {item.length > 0 ? (
                        item.map((products) => (
                            <div key={products.id} className="flex items-center justify-between bg-white shadow-xl p-6 rounded-lg mb-6">
                                {/* Product Image */}
                                <div className="w-24">
                                    <img className="rounded-lg object-cover" src={products.image} alt={products.name} />
                                </div>

                                {/* Product Details */}
                                <div className="flex-1 ml-6">
                                    <h2 className="text-xl font-semibold text-teal-800">{products.name}</h2>
                                    <p className="text-neutral-600 mt-2">{products.description}</p>
                                    <p className="text-neutral-600 mt-2">Quantity: {products.quantity}</p>
                                </div>

                                {/* Delete Button */}
                                <button className="bg-red-700 hover:bg-red-800 text-white py-2 px-4 rounded-lg"
                                onClick={()=>handleDelete(products.id)}>
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
                {item.length>0?(
                <div className="bg-white shadow-lg p-6 rounded-lg">
                    <h1 className="text-2xl font-bold text-teal-800 mb-6">Cart Summary</h1>
                    <div className="flex justify-between mb-4">
                        <span className="text-teal-900">Subtotal</span>
                        <span className="font-semibold">${calculateSubTotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-4">
                        <span className="text-teal-900">Discount</span>
                        <span className="font-semibold">${calculateDiscount().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-teal-800 text-xl font-semibold">
                        <span>Total</span>
                        <span>${calGrandTotal().toFixed(2)}</span>
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
