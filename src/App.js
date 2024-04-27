import Header from './Components/Header/header';
import Loader from "./Components/Loader/loader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom"
import Login from './Pages/Auth/login';
import Register from './Pages/Auth/Register';
import Product from './Pages/Product/product';
import ViewProduct from './Pages/Product/viewProduct';
 import PrivateRoutes from './Router/protectedRoutes';
 import ViewCart from './Pages/Product/addToCart'
import Googlelogin from './Pages/Auth/googlelogin';
import Profile from './Pages/customer/customer';
import Stripe from './Pages/Checkout/Stripe';
import Wishlist from './Pages/Product/wishlist';
function App() {
  return (
    <>
    <ToastContainer />
    <Header/>
      <Routes>
      <Route element={<PrivateRoutes/>}>
              {/* <Route path='/products' element={<Product/>} /> */}
              <Route path ="/viewcart" element={<ViewCart/>}/>
        <Route path="/viewproducts/:id" element={<ViewProduct/>}/>
        <Route path="/googlelogin" element={<Googlelogin/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path ="/stripe" element={<Stripe/>}/>
        <Route path="/wishlist" element={<Wishlist/>}/>
       </Route>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/products" element={<Product/>}/>
       
      </Routes>
     

    
    </>
   
    
  );
}

export default App;
