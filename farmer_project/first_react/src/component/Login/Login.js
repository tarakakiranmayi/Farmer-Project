import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import {useForm} from 'react-hook-form';
import  { useEffect, useState } from 'react';
// import {useForm} from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import '../Login/Login.css'
import axios from 'axios';
import { useDispatch,useSelector } from 'react-redux';
import UserFarmerLoginThunk, { userfarmerThunk } from '../../Redux/slices/UserFarmerLoginThunk';
function Login() {
    let {register,handleSubmit,formState:{errors}}=useForm()
    let navigate=useNavigate()
    let [err,setErr]=useState('')
    let dispatch=useDispatch()
    let data=useSelector((state)=>state.userFarmer)
    console.log(data)
    async function handleFormSubmit(obj)
    {   
        console.log(obj)
        // let res= await axios.post(' http://localhost:3030/userapi/login',obj, {
        //     headers: {
        //       'Content-Type': 'application/json',
        //       // Include any other headers as needed
        //     }})
        //     console.log(res.data)
        //     if(res.data.message==='login successful')
        //         {
        //             navigate('/')
        //         }
        //         else{
        //              setErr(res.data.message)
        //         }
        dispatch(userfarmerThunk(obj))
        console.log(data)
      
          
    }
  console.log(data)
  if(data.loginStatus==true){
    navigate('/')
  }
 


   
  return (
    <div className='main w-50 border-5 mx-auto border-dark shadow-lg my-5 p-3'>
       <h2 className='text-center m-2'>Login</h2>
       <form onSubmit={handleSubmit(handleFormSubmit)}>
     
{errors.userType && <p className='lead fs-4 text-danger'>Please select a user type</p>}

        <div className=''>
        <lable className="form-lable m-3" htmlFor="email">
        email
        </lable>
        <input type="email" className='form-control m-3 w-75 ' id="email"
        {
            ...register("email",{required:true})
        } ></input>
        {
            errors.email?.type==='required' && <p className='lead fs-6 text-danger'>Invalid Email</p>   
        }
       
        </div>
       <div>
        <label className='form-label m-3' htmlFor='password'>Password</label>
        <input className='form-control m-3 w-75' type='password' id="password"
        {
            ...register("password",{required:true})
        }
       
        
        ></input>
         {
            errors.password?.type==='required' && <p className='lead fs-6 text-danger'>Password is required</p>
        }
       </div>
       <div className='text-center mt-4'>
        <button className='btn btn-success mx-auto' type='submit'>Submit</button>
       </div>
      
       </form>
       {
            err.length!=0 && <p className='text-center m-3'>{err}</p>
        }
       <p className='lead fs-5 text-center m-4'>
       
        <Link to="/Register" className=''>New user
        </Link>
       </p>
       {
        data.errorOccured
        && <p className='text-danger fs-3 text-center'>{data.errorMessage}</p>
       }
       
    </div>
  )
}

export default Login