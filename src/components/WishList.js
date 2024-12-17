import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWishlist } from '../Redux/Slices/WishListSlice';
import { RiDislikeFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { addRemoveWishlist } from '../Redux/Slices/WishListSlice';
import { FcLike } from "react-icons/fc";

const Wishlist = () => {
    const { wishlist } = useSelector((state) => state.wishlist);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const itemDetails = (id) => {
        navigate(`/product/${id}`);
    };

    const handleAddRemove = (id) => {
        dispatch(addRemoveWishlist(id));
    };

    useEffect(() => {
        dispatch(fetchWishlist());
    }, [dispatch]);

    return (
        <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-semibold text-teal-800 text-center mb-8">My Wishlist</h2>

            {wishlist.length === 0 ? (
                <div className="flex flex-col items-center bg-gray-100 p-8 rounded-lg shadow-md">
                    <RiDislikeFill className="text-5xl text-red-600 mb-4" />
                    <p className="text-lg font-medium text-gray-700">No Liked Products</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {wishlist.map((item) => (
                        <div
                            key={item.productId}
                            className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition duration-300 relative"
                        >
                            <img
                                src={item.image}
                                alt="item"
                                onClick={() => itemDetails(item.productId)}
                                className="w-full h-48 object-fil rounded-lg cursor-pointer hover:scale-105 transition-transform"
                            />
                            <h1 className="mt-4 text-lg font-medium text-gray-800">{item.productName}</h1>
                            <h1 className="mt-2 text-lg font-bold text-teal-800">₹ {item.price}</h1>
                            <FcLike
                                onClick={() => handleAddRemove(item.productId)}
                                className="text-3xl absolute top-4 right-4 cursor-pointer"
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;
