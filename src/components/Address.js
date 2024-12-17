import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaAddressCard } from "react-icons/fa6";
import { addAddress } from '../Redux/Slices/AddressSlice';
import { useNavigate } from 'react-router-dom';
import { deleteAddress } from '../Redux/Slices/AddressSlice';


const Address = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {address} = useSelector(state => state.address);
    const [ addressForm, setAddressForm ] = useState(false);

    console.log("Addressc from add page==>", address);

    const [errors, setErrors] = useState({});
    
    const [delAddress, setDelAddress] = useState({
        fullName: "",
        phoneNumber: "",
        pincode: "",
        houseName: "",
        place: "",
        postOffice: "",
        landMark: "",
    });


    const handleFormModal = ()=>{
        if(address.length == 3){
            alert("Maximum address limit reached")
            return;
        }
        setAddressForm(true)
    };

    const handleAddrss = (e) => {
    const { name, value } = e.target;
        setDelAddress({ ...delAddress, [name]: value });
    };

    const validate = () => {
        const newErrors = {};
        if (!delAddress.fullName) newErrors.fullName = "Full Name is required";
        if (!delAddress.phoneNumber)
          newErrors.phoneNumber = "Phone Number is required";
        if (delAddress.phoneNumber.length != 10)
          newErrors.phoneNumber = "Must contails 10 digits";
        if (!delAddress.pincode) newErrors.pincode = "Pincode is required";
        if (!delAddress.houseName) newErrors.houseName = "House Name is required";
        if (!delAddress.place) newErrors.place = "Place is required";
        if (!delAddress.postOffice)
          newErrors.postOffice = "Post Office is required";
        if (!delAddress.landMark) newErrors.landMark = "Land Mark is required";
        return newErrors;
      };

    const handleAddrssSubmit = async (e) => {
        e.preventDefault();
        const error = validate();
        if(Object.keys(error).length > 0){
            setErrors(error);
            return;
        }
        try{
          dispatch(addAddress(delAddress)).unwrap();
          setAddressForm(false);
          alert("Address added successfully")
        }
        catch(err){
          console.log("AddAddress error", err)
        }
      };

    const handleAddressDelete = (addressId)=>{
        try{
            dispatch(deleteAddress(addressId));
            alert("Address deleted successfully")
        }
        catch(err){
            console.log("delete address error", err)
        }
    }


  return (
    <div className='container mx-auto py-12 px-4 bg-gray-100 '>
        <div className='mx-auto mb-24 md:mt-12 mt-14 relative'>
        <h2 className="text-2xl text-teal-700 font-bold mb-4 text-center"> Addresses</h2>

        {/* Add addres button */}
        <div className={`absolute top-2 right-7 space-x-2 ${
            addressForm ? 'filter blur-lg' : ''
            }`}>
            <button
                onClick={()=> navigate(-1)}
                className="bg-red-700 text-white py-2 rounded-lg hover:bg-red-600 p-4 "
                >
                Back
            </button>
            <button
                  onClick={handleFormModal}
                className="bg-teal-800 text-white py-2 rounded-lg hover:bg-teal-700 p-4 "
                >
                Add New Address
            </button>
        </div>

        {address.length === 0 ? (
            <div className='flex flex-col items-center text-center pb-32 p-10 rounded-lg space-y-3'>
                <FaAddressCard className='h-40 w-40 text-gray-400'/>
                <p style={{color:'#052560'}} className='font-semibold text-xl'>No  Addresses</p>
            </div>
        ):(null)}

        <div className={`w-auto mt-14 flex justify-center space-x-4 ${
            addressForm ? 'filter blur-xl' : ''
        }`}>
            {address.map((add, index)=>(
                <div className='h-96 w-[400px] rounded-xl shadow-lg border border-b-slate-100'>
                    <h4  className='text-center text-teal-700 font-semibold text-xl mt-5'>Address {index+1}</h4>
                    <div className='m-5 space-y-2'>

                        <p className='text-lg'>
                            <span className=''>full Name : </span>
                            <span className='font-semibold text-teal-700'>{add.fullName}</span>
                        </p>

                        <p className='text-lg'>
                            <span className=''>House Name : </span>
                            <span className='font-semibold text-teal-700'>{add.houseName}</span>
                        </p>

                        <p className='text-lg'>
                            <span className=''>Landmark : </span>
                            <span className='font-semibold text-teal-700'>{add.landMark}</span>
                        </p>

                        <p className='text-lg'>
                            <span className=''>Phone Number : </span>
                            <span className='font-semibold text-teal-700'>{add.phoneNumber}</span>
                        </p>

                        <p className='text-lg'>
                            <span className=''>Pincode : </span>
                            <span className='font-semibold text-teal-700'>{add.pincode}</span>
                        </p>

                        <p className='text-lg'>
                            <span className=''>Place : </span>
                            <span className='font-semibold text-teal-700'>{add.place}</span>
                        </p>

                        <p className='text-lg'>
                            <span className=''>Post Office : </span>
                            <span className='font-semibold text-teal-700'>{add.postOffice}</span>
                        </p>

                        <div className='flex justify-center'>
                            <button 
                                onClick={()=>handleAddressDelete(add.addressId)}
                                className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800 transition mt-2 ">
                                Delete Address
                            </button>
                        </div>
                        
                    </div>
                </div>
            ))}
        </div>



    {/* Add new address modal */}
      <div>
        {addressForm && (
          <form
          className="space-y-4 absolute top-10 left-96 h-[500px] w-3/6 bg-blue-100 p-10 rounded-xl z-1"
            onSubmit={handleAddrssSubmit}
            >
            <div className="flex items-center gap-4">
                <label htmlFor="fullName" className="font-semibold w-1/3">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={delAddress.fullName}
                  className="border p-1 rounded-lg flex-grow placeholder:text-gray placeholder:text-sm"
                  placeholder="Full Name"
                  onChange={handleAddrss}
                />
                {errors.fullName && (
                    <span className="text-red-500 text-sm">{errors.fullName}</span>
                )}
            </div>
        
            <div className="flex items-center gap-4">
                <label htmlFor="phoneNumber" className="font-semibold w-1/3">
                  Phone Number
                </label>
                <input
                  type="number"
                  name="phoneNumber"
                  value={delAddress.phoneNumber}
                  className="border p-2 rounded-lg flex-grow placeholder:text-gray placeholder:text-sm"
                  placeholder="Phone Number"
                  onChange={handleAddrss}
                />
                {errors.phoneNumber && (
                  <span className="text-red-500 text-sm">{errors.phoneNumber}</span>
                )}
          </div>
        
          <div className="flex items-center gap-4">
            <label htmlFor="pincode" className="font-semibold w-1/3">
              Pincode
            </label>
            <input
              type="number"
              name="pincode"
              value={delAddress.pincode}
              className="border p-2 rounded-lg flex-grow placeholder:text-gray placeholder:text-sm"
              placeholder="Pincode"
              onChange={handleAddrss}
            />
            {errors.pincode && (
              <span className="text-red-500 text-sm">{errors.pincode}</span>
            )}
          </div>
        
          <div className="flex items-center gap-4">
            <label htmlFor="houseName" className="font-semibold w-1/3">
              House Name
            </label>
            <input
              type="text"
              name="houseName"
              value={delAddress.houseName}
              className="border p-2 rounded-lg flex-grow placeholder:text-gray placeholder:text-sm"
              placeholder="House Name"
              onChange={handleAddrss}
            />
            {errors.houseName && (
              <span className="text-red-500 text-sm">{errors.houseName}</span>
            )}
          </div>
        
          <div className="flex items-center gap-4">
            <label htmlFor="place" className="font-semibold w-1/3">
              Place
            </label>
            <input
              type="text"
              name="place"
              value={delAddress.place}
              className="border p-2 rounded-lg flex-grow placeholder:text-gray placeholder:text-sm"
              placeholder="Place"
              onChange={handleAddrss}
            />
            {errors.place && (
              <span className="text-red-500 text-sm">{errors.place}</span>
            )}
          </div>
        
          <div className="flex items-center gap-4">
            <label htmlFor="postOffice" className="font-semibold w-1/3">
              Post Office
            </label>
            <input
              type="text"
              name="postOffice"
              value={delAddress.post}
              className="border p-2 rounded-lg flex-grow placeholder:text-gray placeholder:text-sm"
              placeholder="Post Office"
              onChange={handleAddrss}
            />
            {errors.postOffice && (
              <span className="text-red-500 text-sm">{errors.postOffice}</span>
            )}
          </div>
        
          <div className="flex items-center gap-4">
            <label htmlFor="landMark" className="font-semibold w-1/3">
              Land Mark
            </label>
            <input
              type="text"
              name="landMark"
              value={delAddress.landMark}
              className="border p-2 rounded-lg flex-grow placeholder:text-gray placeholder:text-sm"
              placeholder="Land Mark"
              onChange={handleAddrss}
            />
            {errors.landMark && (
              <span className="text-red-500 text-sm">{errors.landMark}</span>
            )}
          </div>
        
          <div className="flex space-x-3">
            <button
              type="submit"
              className="w-4/6 bg-teal-800 text-white py-2 rounded-lg hover:bg-teal-700"
            >
              Confirm Address
            </button>
            <button
              onClick={()=> setAddressForm(false)}
              className="w-2/6 bg-red-700 text-white py-2 rounded-lg hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </form>
        
        )}
      </div>

      </div>
    </div>
  )
}

export default Address