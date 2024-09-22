import './App.css';
import { Route,Routes, useLocation } from 'react-router-dom';

import Signup from './pages/Signup';
import Home from './pages/Home';
import Login from "./pages/Login"
import Footer from "./components/Footer"
import Store from './pages/Store'
import Navbar from './components/Navbar';
import Productdetails from './components/Productdetails';
import ItemPerCategory from './pages/ItemPerCategory';
import Cart from './pages/Cart'
import Profile from './components/Profile'
import Payment from './pages/Payment'
import Ordersummary from './components/Ordersummary';
import Categories from './components/Categories';
import Userlist from './Admin/Userlist';
import UserDetails from './Admin/UserDetails';
import Productlist from './Admin/Productlist';
import Productspercategory from './Admin/Productspercategory';
import AddProducts from './Admin/AddProducts';
import Productdetail from './Admin/Productdetail';
import EditProducts from './Admin/EditProducts';
import AdminLayout from './Admin/AdminLayout';
import NoMatch from './components/Nomatch';
import Dashboard from './Admin/Dashboard';



function App() {
const location=useLocation()

const display=location.pathname.startsWith("/admin")

  return (
    <>
    {!display && <Navbar/>}
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/sign-up" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/store" element={<Store/>}/>
      <Route path="/product/:id" element={<Productdetails/>}/>
      <Route path='/category' element={<Categories/>}/>
      <Route path='/category/:category' element={<ItemPerCategory/>} />
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/payment' element={<Payment/>}/>
      <Route path='/order-summary' element={<Ordersummary/>}/>

      {/* admin section */}

      <Route path='/admin' element={<AdminLayout/>}>
        <Route path='dashboard' element={<Dashboard/>}/>
        <Route index element={<Dashboard/>}/>
        <Route path='userlist' element={<Userlist/>}/>
        <Route path='userd/:userid' element={<UserDetails/>}/>
        <Route path='productlist' element={<Productlist/>}/>
        <Route path='productl/:productcategory' element={<Productspercategory/>}/>
        <Route path='productd/:id' element={<Productdetail/>}/>
        <Route path='producte/:id' element={<EditProducts/>}/>
        <Route path='addproducts' element={<AddProducts/>}/>
      </Route>
      <Route path='*' element={<NoMatch/>}/>
    </Routes>
    {!display && <Footer/> }
  
    </>

  );
}

export default App;
