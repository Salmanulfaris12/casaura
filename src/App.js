import './App.css';
import { Route,Routes } from 'react-router-dom';

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


function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/sign-up" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/store" element={<Store/>}/>
      <Route path="/:id" element={<Productdetails/>}/>
      <Route path='/category' element={<Categories/>}/>
      <Route path='/category/:category' element={<ItemPerCategory/>} />
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/payment' element={<Payment/>}/>
      <Route path='/order-summary' element={<Ordersummary/>}/>
    </Routes>
    <Footer/>
    </>

  );
}

export default App;
