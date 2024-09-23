import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../Context/Cartcontext';


const Productdetails = () => {
    const { id } = useParams();
    const [items, setItems] = useState({});
    const [quantity,setQuantity]=useState(1)
    const userId=localStorage.getItem("userId")
    const navigate=useNavigate()
    const {setCart}=useCart()

    const getcart=async(userId)=>{
     const response=await axios.get(`http://localhost:3001/users/${userId}`)
     return response.data.cart
    }

    const addcart=async(product,qty)=>{
      const currentCart=await getcart(userId)
      const existproduct=currentCart.find((item)=>item.id===product.id)
      let updatedCart;

      if(existproduct){
        updatedCart=currentCart.map((item)=>(
          item.id===product.id?{...item,quantity:item.quantity+qty}:item
        ))
      }
      else{
        updatedCart= [...currentCart,{...product,quantity:qty}]
      }
      axios.patch(`http://localhost:3001/users/${userId}`,{cart:updatedCart})
      .then((res)=>{console.log(res)
        setCart(updatedCart)
      })
     
      alert("Product is added to Cart")
    }
     
  
  

    useEffect(() => {
      if(id){
        axios.get(`http://localhost:3001/products/${id}`)
            .then((res) => setItems(res.data))
            .catch((err) => console.log("fetching error....",err))
      }
      else{
        navigate("/")
      }
    }, [id,navigate]);

    const handleaddcart=()=>{
      if (userId){
        addcart(items,quantity)
      }
      else{
        navigate("/login")
      }
    }



    const handleQuantityChange = (e) => {
      setQuantity(Number(e.target.value));
  };


    return (
        <div className="flex justify-center items-center min-h-screen bg-neutral-50 py-12">
        
                    <div key={items.id} className="bg-white shadow-lg rounded-xl p-6 max-w-5xl flex flex-col md:flex-row">
                        {/* Product Image */}
                        <div className="md:w-1/2">
                            <img src={items.image} alt={items.name} className="rounded-lg w-full h-auto object-cover" />
                        </div>

                        {/* Product Details */}
                        <div className="md:w-1/2 mt-6 md:mt-0 md:ml-8 flex flex-col justify-between">
                            <div>
                                <h2 className="text-2xl font-semibold text-teal-800 mb-3">{items.name}</h2>
                                <p className="text-neutral-600 mb-4 text-2xl">{items.description}</p>
                                <p className="text-neutral-500 mb-6 text-lg">Material: {items.material}</p>
                                <h1 className="text-3xl font-bold text-teal-800 mb-8">${items.price}</h1>
                            </div>
                        
                              <div className="mb-6">
                                  <label htmlFor="quantity" className="block text-neutral-600 mb-2">Quantity</label>
                                  <select 
                                      id="quantity" 
                                      value={quantity} 
                                      onChange={handleQuantityChange} 
                                      className="border rounded-lg py-2 px-4 bg-white focus:ring-2 focus:ring-primary focus:outline-none">
                                      {Array.from({ length: 10 }, (_, i) => i + 1).map((qty) => (
                                          <option key={qty} value={qty}>{qty}</option>
                                      ))}
                                  </select>
                              </div>

                            {/* Add to Cart Button */}
                            <button 
                            onClick={handleaddcart}
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
