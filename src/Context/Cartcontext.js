
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';


const CartContext = createContext();
export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const userToken = localStorage.getItem("userToken");

  useEffect(() => {
    if (userToken) {
      axios
      .get("https://localhost:7151/api/Cart/All", {
          headers: {
              Authorization: `Bearer ${userToken}`,
          },
      })
      .then((res) => {
        console.log("API Response:", res.data);
        setCart(res.data.data || []);
    })
        .catch((err) => console.log(err));
    }
  }, [userToken]);

  const getcart=async()=>{
    try{
      const response=await axios.get("https://localhost:7151/api/Cart/All",{  
        headers:{
            Authorization: `Bearer ${localStorage.getItem("userToken")}`
           },
});
return response.data.data
    }
    catch(err){
      console.log("error on getting cart",err);
    }
}
  return (
    <CartContext.Provider value={{ cart, setCart,getcart}}>
      {children}
    </CartContext.Provider>
  );
};
