import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const ItemPerCategory = () => {
    const { category } = useParams()
    const [items, setItems] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        axios.get("http://localhost:3001/products")
            .then((res) => setItems(res.data))
            .catch(() => console.log("fetching error..."))
    }, [category]) // Add dependency on category to avoid infinite loop

    const products = items.filter((ele) => ele.category === category)

    const handleProductClick = (id) => {
        navigate(`/${id}`)
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8 ">
            <div className=" mt-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-teal-800 mb-6 text-center">{category}</h1>
                <div className="grid grid-cols-1 mx-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 cursor-pointer  "
                            onClick={() => handleProductClick(product.id)}
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
    )
}

export default ItemPerCategory
