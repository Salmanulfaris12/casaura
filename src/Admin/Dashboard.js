import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Chart as ChartJS,defaults} from "chart.js/auto"
import {Doughnut,Bar} from"react-chartjs-2"


defaults.maintainAspectRatio=false;
defaults.responsive=true


const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [revenue,setRevenue]=useState(null);
  const [orderItems,setOrderItems]=useState(null)

  useEffect(() => {
    axios
      .get('https://localhost:7151/api/Product/All')
      .then((res) => setProducts(res.data.data))
      .catch((err) => console.log('Error fetching products:', err));
  }, []);

  useEffect(()=>{
    axios.get('https://localhost:7151/api/Order/totalrevenue',
        {
            headers:{
                Authorization: `Bearer ${localStorage.getItem("adminToken")}`
            }
        })
        .then((res)=>{
            setRevenue(res.data);
        })
        .catch((err)=>{
            console.log("totalRevenue error",err)
        })

    axios.get('https://localhost:7151/api/Order/totalproductspurchased',
        {
            headers:{
                Authorization: `Bearer ${localStorage.getItem("adminToken")}`
            }
        })
        .then((res)=>{
            setOrderItems(res.data);
        })
        .catch((err)=>{
            console.log("totalOrder error",err)
        })
},[])



  const productsByCategory = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      {/* Main Content Area */}
      <main className="flex-1 p-6 overflow-auto">
        <h1 className="text-3xl font-bold text-teal-800 mb-4">Overview</h1>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-teal-700">Total Revenue Generated</h2>
            <p className="text-2xl font-bold">{revenue}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-teal-700">Total Product Purchased</h2>
            <p className="text-2xl font-bold">{orderItems}</p>
          </div>
        </div>
      </main>
    
    <div>
    <h2 className="mx-5 text-2xl font-bold text-teal-800 mb-4">Products by Category</h2>
    <div className='h-96 w-auto mx-6 bg-white rounded-lg shadow-md'>
        <Doughnut 
            data={{
                labels:Object.keys(productsByCategory),
                datasets:[
                    {
                        label:"Products per category",
                        data:Object.values(productsByCategory),
                        backgroundColor: [
                            'rgb(132, 169, 140)',
                            'rgb(45, 56, 75)',
                            'rgb(107, 142, 146)',
                            'rgb(189, 154, 141)',
                            'rgb(230, 221, 210)',
                            'rgb(96, 125, 139)',
                            'rgb(220, 220, 220)'
                          ],
                    }
                ]
            }}

        />
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
