import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Productspercategory = () => {
    const { categoryId } = useParams();
    const [items, setItems] = useState([]);
    const navigate=useNavigate()

    useEffect(() => {
        axios.get(`https://localhost:7151/api/Product/GetByCategory?CategoryId=${categoryId}`)
            .then((res) => {
                console.log("Fetched products:", res.data.data); // Log API response to check structure
                setItems(res.data.data);
            })
            .catch((err) => console.log("Fetching error:", err));
    }, [categoryId]);

    // const products = items.filter((ele) => ele.category === productcategory);

    const take=(id)=>{
        navigate(`/admin/productd/${id}`)
    }

    return (
        <div className="container mx-auto p-4 ">
            <h1 className="text-2xl text-teal-800 font-bold mb-6">Products </h1>
            <div className="space-y-6">
                {items.length > 0 ? (
                    items.map((product) => (
                        <div key={product.productId}
                        onClick={()=>take(product.productId)}
                        className="cursor-pointer border rounded-lg shadow-md p-4 flex items-center space-x-4">
                            <img src={product.image} alt={product.productName} className="w-24 h-24 object-cover rounded-lg" />
                            <div className="flex-1">
                                <h2 className="text-lg text-teal-800 font-semibold mb-2">{product.productName}</h2>
                                <p className="text-gray-600 mb-2">{product.productDescription}</p>
                                <p className="text-xl text-teal-800 font-bold">₹{product.productPrice}</p>
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

