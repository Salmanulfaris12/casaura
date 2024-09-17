import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Store = () => {
  const [products, setProducts] = useState([]);
 const navigate=useNavigate()

  useEffect(() => {
    
    axios.get('http://localhost:3001/products')
    .then((res) => setProducts(res.data))
    .catch(()=>console.log("fetching error"))
  }, []);

  const take=(id)=>{
    navigate(`/${id}`)
  }

  return (
    <div className="py-16 bg-gray-100 ">
      <div className=" mt-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* <h2 className="text-3xl font-bold text-teal-800 text-center mb-12">Our Products</h2> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105"
              onClick={()=>take(product.id)}
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-fill"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-teal-800">{product.name}</h3>
                <p className="mt-2 text-gray-600">{product.description}</p>
                <h1 className="mt-4 text-xl font-bold text-teal-800">${product.price}</h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Store;
