import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Store = () => {
  const [products, setProducts] = useState([]);
 const navigate=useNavigate()

  useEffect(() => {
    
    axios.get('https://localhost:7151/api/Product/All')
    .then((res) =>{console.log(res.data.data)
     setProducts(res.data.data)})
    .catch(()=>console.log("fetching error"))
  }, []);

  const take=(id)=>{
    navigate(`/product/${id}`)
  }

  return (
    <div className="py-16 bg-gray-100 ">
      <div className=" mt-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* <h2 className="text-3xl font-bold text-teal-800 text-center mb-12">Our Products</h2> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.productId}
              className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105"
              onClick={()=>take(product.productId)}
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.productName}
                  className="w-full h-full object-fill"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-teal-800">{product.productName}</h3>
                <p className="mt-2 text-gray-600">{product.productDescription}</p>
                {/* <h1 className="mt-4 text-xl font-bold text-teal-800">${product.productPrice}</h1> */}
                <div >
                    <span className=" text-teal-800 text-xl font-bold mb-4 "> ₹ {product.productPrice}</span>

                    <span className=" text-red-800 text-l font-bold mb-4 ml-2"><strike> ₹ {product.mrp}</strike></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Store;
