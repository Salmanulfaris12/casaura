import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Productspercategory = () => {
    const { productcategory } = useParams();
    const [items, setItems] = useState([]);
    const navigate=useNavigate()

    useEffect(() => {
        axios.get("http://localhost:3001/products")
            .then((res) => {
                console.log("Fetched products:", res.data); // Log API response to check structure
                setItems(res.data);
            })
            .catch((err) => console.log("Fetching error:", err));
    }, [productcategory]);

    const products = items.filter((ele) => ele.category === productcategory);

    const take=(id)=>{
        navigate(`/admin/productd/${id}`)
    }

    return (
        <div className="container mx-auto p-4 ">
            <h1 className="text-2xl text-teal-800 font-bold mb-6">Products in {productcategory}</h1>
            <div className="space-y-6">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product.id}
                        onClick={()=>take(product.id)}
                        className="cursor-pointer border rounded-lg shadow-md p-4 flex items-center space-x-4">
                            <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded-lg" />
                            <div className="flex-1">
                                <h2 className="text-lg text-teal-800 font-semibold mb-2">{product.name}</h2>
                                <p className="text-gray-600 mb-2">{product.description}</p>
                                <p className="text-xl text-teal-800 font-bold">${product.price}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No products found for this category.</p>
                )}
            </div>
        </div>
    );
};

export default Productspercategory;

