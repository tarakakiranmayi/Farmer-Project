import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Login from './component/Login/Login';
import RootLayout from './component/RootLayout/RootLayout';
import Home from './component/Home/Home';
import React, { useEffect, useState } from 'react';
import Register from './component/Register/Register';
import {useForm} from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Profile from './component/profile/Profile';
import UploadForm from './component/shop/UploadForm';
import Shop from './component/shop/Shop';
import Product from './component/shop/Product';
import Cart from './component/shop/Cart';
import StartPage from './component/Farmers/StartPage';
import Chatroom from './component/Chatroom/Chatroom';
import RegisterPage from './component/Register/RegisterPage';
import CultivateLandForm from './component/Land/CultivateLandFrom';
function App() {
  let router=createBrowserRouter([
    {
      path:"",
      element:<RootLayout/>,
      children:[
        {
          path:"",
          element:<Home/>
        },
        {
          path:"products",
          element:<UploadForm/>
        },
        {
          path:'shop',
          element:<Shop/>

        },
        {
          path:'Product/:_id',
          element:<Product />
        },{
          path:'cart',
          element:<Cart/>
        },
        {
          path:'startpage',
          element:<StartPage/>
        },
        {
          path:'chat/:recipetEmail',
          element:<Chatroom/>
        },
        {
          path:'contractLand',
          element:<CultivateLandForm/>
        }
       
      ]
      
    },
    {
      path:"Login",
      element:<Login/>
    },
    {
      path:"Register",
      element:<Register/>
    },
    {
      path:'RegisterPage',
      element:<RegisterPage/>
    },
    {
      path:"profile",
      element:<Profile/>
    }
  ])
  return (
    <RouterProvider router={router}>

    </RouterProvider>
  );
}

export default App;
