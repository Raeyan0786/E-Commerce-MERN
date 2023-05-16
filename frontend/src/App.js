
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import './App.css';
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './components/Home'
import ProductDetails from './components/product/ProductDetails'
import Cart from './components/cart/Cart'
import Shipping from './components/cart/Shipping'
import ConfirmOrder from './components/cart/ConfirmOrder'
import Login from './components/user/Login';
import { Register } from './components/user/Register';
import { Counter } from './Counter';
import { loadUser } from './actions/userActions'
import Profile from './components/user/Profile';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import NewPassword from './components/user/NewPassword';
import store from './store'
import ForgotPassword from './components/user/ForgotPassword';
import ProtectedRoute from './components/route/ProtectedRoute';
function App() {

  useEffect(() => {
    store.dispatch(loadUser())

  },[])
  return (
    <Router>
      <div className="App">
        <Header/>
        <div className="container container-fluid">
          <Routes>
          <Route path="/count" element={<Counter/>} exact />
            <Route path="/" element={<Home/>} exact />
            <Route path="/search/:keyword" element={<Home/>}  />
            <Route path="/product/:id" element={<ProductDetails/>} exact />
            <Route path="/cart" element={<Cart/>} exact />
            <Route path="/shipping" element={<ProtectedRoute ><Shipping/></ProtectedRoute>} exact />
            <Route path="/confirm" element={<ProtectedRoute ><ConfirmOrder/></ProtectedRoute>} exact />
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/password/forgot" element={<ForgotPassword/>}/>
            <Route path="/password/reset/:token" element={<NewPassword/>} exact />
            <Route path="/me" element={
                          <ProtectedRoute >
                            <Profile/>
                          </ProtectedRoute>} exact />
            <Route path="/me/update" element={
                          <ProtectedRoute >
                            <UpdateProfile/>
                          </ProtectedRoute>} exact />
            <Route path="/password/update" element={
                          <ProtectedRoute >
                            <UpdatePassword/>
                          </ProtectedRoute>} exact />

            {/* <ProtectedRoute path="/me" component={Profile} exact /> */}
            {/* <ProtectedRoute path="/me/update" component={UpdateProfile} exact />
            <ProtectedRoute path="/password/update" component={UpdatePassword} exact /> */}
          </Routes>
          
        </div>
        <Footer/>
    </div>
    </Router>
    // <div className="App">
    //   <Header/>
    //   <Home/>
    //   <Footer/>
    // </div>
    
  );
}

export default App;
