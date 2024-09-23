
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';


const CartContext = createContext();
export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:3001/users/${userId}`)
        .then((res) => setCart(res.data.cart))
        .catch((err) => console.log(err));
    }
  }, [userId]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};
