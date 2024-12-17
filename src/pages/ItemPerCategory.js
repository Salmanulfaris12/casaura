import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const ItemPerCategory = () => {
    const  {categoryid } = useParams()
    const [items, setItems] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        console.log(categoryid);
        axios.get(`https://localhost:7151/api/Product/GetByCategory?CategoryId=${categoryid}`)
        .then((res) => {
            console.log(res.data.data);
            setItems(res.data.data);
        })
        .catch((err) => {
            console.error("fetching can cause error...", err);
        });
      
            
    }, [categoryid]) // Add dependency on category to avoid infinite loop

    

    const handleProductClick = (id) => {
        navigate(`/product/${id}`)
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8 ">
            <div className=" mt-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* <h1 className="text-4xl font-bold text-teal-800 mb-6 text-center">{categoryid}</h1> */}
                <div className="grid grid-cols-1 mx-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {items.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 cursor-pointer  "
                            onClick={() => handleProductClick(product.productId)}
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
    )
}

export default ItemPerCategory
