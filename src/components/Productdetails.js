import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FcLike } from "react-icons/fc";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { useCart } from '../Context/Cartcontext';
import { useDispatch,useSelector } from 'react-redux';
import { addRemoveWishlist } from '../Redux/Slices/WishListSlice';


const Productdetails = () => {
  // const [isLiked,setIsLiked] =useState(false);
    const { id } = useParams();
    const [items, setItems] = useState({});
    const userToken=localStorage.getItem("userToken")
    const navigate=useNavigate()
    const {setCart,getcart}=useCart()
    const dispatch=useDispatch();
    const {wishlist} = useSelector(state => state.wishlist);

    
    const addcart = async (productid) => {
      try {
        const response = await axios.post(
          `https://localhost:7151/api/Cart/Add/${productid}`,
          { productid },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
          }
        );
        console.log(response.data);
        alert("Product is added to Cart");
        const cartItem= await getcart()
        setCart(cartItem)
      } catch (err) {
        console.error("Error adding product to cart:", err.response?.data || err.message);
      }
    };
    


    useEffect(() => {
      if(id){
        axios.get(`https://localhost:7151/api/Product/GetById/${id}`)
            .then((res) => setItems(res.data.data))
            .catch((err) => console.log("fetching error....",err))
      }
      else{
        navigate("/")
      }
    }, [id,navigate]);

    const handleaddcart=(productid)=>{
      if (userToken){
        addcart(productid)
      }
      else{
        navigate("/login")
      }
    }

    const handleWishlist=async (id)=>{
     if(userToken){
      dispatch(addRemoveWishlist(id));
     }
     else{
      navigate("/login")
     }
    }
    const isProductInWishlist = (productId) => {
      return wishlist.some((item) => item.productId === productId);
    };


    return (
        <div className="flex justify-center items-center min-h-screen bg-neutral-50 py-12">
        
                    <div key={items.productId} className="bg-white shadow-lg rounded-xl p-6 max-w-5xl flex flex-col md:flex-row">
                        {/* Product Image */}
                        <div className="md:w-1/2 relative">
                          <img
                            src={items.image}
                            alt={items.productName}
                            className="rounded-lg w-full h-auto object-cover"
                          />
                          <button
                            onClick={() => handleWishlist(items.productId)}
                            className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-lg"
                          >
                            {isProductInWishlist(items.productId) ? (
                              <AiFillHeart size={24} className="text-red-500" />
                            ) : (
                              <AiOutlineHeart size={24} className="text-gray-500" />
                            )}
                          </button>
                        </div>
                        {/* Product Details */}
                        <div className="md:w-1/2 mt-6 md:mt-0 md:ml-8 flex flex-col justify-between">
                            <div>
                                <h2 className="text-2xl font-semibold text-teal-800 mb-3">{items.productName}</h2>
                                <p className="text-neutral-600 mb-4 text-2xl">{items.productDescription}</p>
                                <p className="text-neutral-500 mb-6 text-lg">Material: {items.material}</p>
                                {/* <h1 className="text-3xl font-bold text-teal-800 mb-8">${items.price}</h1> */}
                                <div >
                                <span className=" text-teal-800 text-3xl font-bold mb-4 "> ₹ {items.productPrice}</span>

                                <span className=" text-red-800 text-l font-bold mb-4 ml-2"><strike> ₹ {items.mrp}</strike></span>
                              </div>
                            </div>
                        

                            {/* Add to Cart Button */}
                            <button 
                            onClick={()=>handleaddcart(items.productId)}
                             className="bg-teal-700 hover:bg-teal-900 text-white py-3 px-8 rounded-full text-md font-medium transition-all duration-300 ease-in-out shadow-lg">
                                Add to Cart
                            </button>

                            <button
                             className=" mt-4 bg-red-700 hover:bg-red-900 text-white py-3 px-8 rounded-full text-md font-medium transition-all duration-300 ease-in-out shadow-lg"
                            onClick={()=>navigate(-1)}>
                              Back
                            </button>
                        </div>
                    </div>
        </div>
    );
}

export default Productdetails;
