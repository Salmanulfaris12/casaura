import React,{ useState }from 'react'
import axios from "axios"
import logo from "../assets/logo2.png"
import { useNavigate } from 'react-router-dom'

const Signup = () => {

    const navigate=useNavigate()
    const [formData,setFormData]=useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:""
    })
    const [errors,setErrors]=useState({})
    const [submitSuccess, setSubmitSuccess] = useState(null);
    
    const validate=()=>{
        const errors={};
        if(!formData.name)errors.name="Name is Required";
        if(!formData.email)errors.email="Email is Required";
        else if(!/\S+@\S+\.\S+/.test(formData.email))errors.name="Invalid Email";
        if(!formData.password)errors.password="Password is Required";
        else if(formData.password.length<8)errors.password="Password must contain 8 characters";
        if(formData.password!==formData.confirmPassword)errors.confirmPassword="Password do not match";

        return errors
    }


    const handleChange=(e)=>{
        const {name,value}=e.target;
        setFormData({
            ...formData,
            [name]:value
        })
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
        } else {
          console.log(formData);
          // Handle form submission logic
            axios.post("http://localhost:3001/users",{...formData,cart:[]})
                .then((res)=> {
                    console.log(res)
                    setSubmitSuccess(true)
                    setFormData({   
                        name: '',
                        email: '',
                        password: '',
                        confirmPassword: ''});
                    setErrors({})
        }).catch((err)=>{
            console.log( "error in submitting form",err)
            setSubmitSuccess(false)
        })

          
            navigate('/login',{replace:true})
        }
      };


    
  return (
    <div className='min-h-screen bg-teal-800 flex items-center justify-center'>
        <div className='w-full max-w-md bg-white p-8 rounded-lg shadow-lg'>
            <div className='flex justify-center mb-3'> 
                <img src={logo} alt="logo" className="w-40 h-auto " />
            </div>
           
            <h2 className='text-2xl font-bold mb-6  text-center text-teal-800'>Sign up</h2>
            <form   onSubmit={handleSubmit} className='space-y-4'>
                <div>
                    <label htmlFor='name' className='block text-gray-700'>Name</label>
                    <input
                     type='text' 
                     id='name'
                     name='name'
                     value={formData.name}
                     placeholder='Your Name'
                     className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm ${errors.name ? 'border-red-500' : ''}`}
                     onChange={handleChange}
                     required

                     />
                     {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                    <label htmlFor='email' className='block text-gray-700'>Email</label>
                    <input 
                     type='email'
                     id='email'
                     name='email'
                     value={formData.email} 
                     placeholder='Your Email'
                     className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm ${errors.name ? 'border-red-500' : ''}`}
                     onChange={handleChange}
                     required
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                    <label htmlFor='password' className='block text-gray-700'>Password</label>
                    <input 
                     type='password'
                     id='password'
                     name='password' 
                     value={formData.password}
                     placeholder='Your Password'
                     className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm ${errors.name ? 'border-red-500' : ''}`}
                     onChange={handleChange}
                     required

                      />
                       {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                    <label htmlFor='confirmPassword' className='block text-gray-700'>Confirm Password</label>
                    <input 
                     type='password'
                     id=' confirmPassword' 
                     name='confirmPassword'
                     value={formData.confirmPassword}
                     placeholder='Confirm Your Password'
                     className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm ${errors.name ? 'border-red-500' : ''}`}
                     onChange={handleChange}
                     required
                      />
                       {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                    <button 
                     type='submit'
                     className=' w-full py-2 px-4 bg-teal-800 text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500'>
                     Sign Up
                    </button>
                    {submitSuccess === true && <p className="text-green-500 text-xs mt-2">Registration successful!</p>}
                    {submitSuccess === false && <p className="text-red-500 text-xs mt-2">Failed to submit form. Please try again.</p>}
                </div>
            </form>
        </div>
    </div>
  )
}

export default Signup