import React, { useState } from 'react'
import {useForm} from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { NavLink } from 'react-router-dom';
import '../Register/Register.css'

function Register() {
    let{register,handleSubmit,formState:{errors}}=useForm()
    let navigator=useNavigate()
    let [err,setErr]=useState('')
    let res
    function change()
    {
        // navigator('/Login')
    }
    async function handleFormSubmit(obj)
    { 
        console.log(obj)
        if(obj.userType!=null)
    {
         res= await axios.post(' http://localhost:3030/userapi/NewUser',obj, {
            headers: {
              'Content-Type': 'application/json',
              // Include any other headers as needed
            }})
            console.log(res.data)
            if(res.data.message==='User profile uploaded successfully')
                {
                    async function mail(){
                        let result= await axios.get(`http://localhost:3030/postMail/${obj.email}`)
                      console.log(result)
                      console.log(obj.email)
                }
                         mail()
                    navigator('/Login')
                }
                else{
                     setErr(res.data.message)
                }
    }
   
      
        
    }
  return (
    <div className="main border p-3 m-3  w-25 mx-auto mt-5 shadow-lg " >
            <h1 className='fs-2 text-success text-center mb-3'>Register</h1>
          <form onSubmit={handleSubmit(handleFormSubmit)} className=''>
          <div className='mb-3 row mx-1 form-check d-flex mb-1'>
    <div className='col lg-col-6'>
        <input
            type="radio"
            name="userType"
            value="user"
            className='form-check-input'
            {...register("userType", { required: true })}
        />
        <label htmlFor="user" className='form-label'>User</label>
    </div>
    <div className='col lg-col-6'>
        <input
            type="radio"
            name="userType"
            value="farmer"
            className='form-check-input'
            {...register("userType", { required: true })}
        />
        <label htmlFor="farmer" className='form-label'>Farmer</label>
    </div>
   
</div>
{errors.userType && <p className='lead fs-4 text-success'>Please select a user type</p>}

        <div className='mb-1'>
            <label htmlFor='name' className='form-label mx-3'>
                name
                 
            </label>
            <input id="name" className='form-control w-75 mx-3' type="text" {
                ...register("name",{required:true,minLength:4,maxLength:8})
            }/>
            {
                errors.name?.type==='required' && <p className='lead fs-4 text-success'>Invalid Username</p>}
               { errors.name?.type==='minLength' && <p className='lead fs-4 text-success'>minLenght is 4</p>}
               { errors.name?.type==='maxLength' && <p className='lead fs-4 text-success'>maxLenght is 8</p>}
            
        </div>
        <div className='mb-3'>
        <label className='form-label mx-3' htmlFor='password'>Password</label>
        <input className='form-control mx-3 w-75' type='password' id="password"
        {
            ...register("password",{required:true})
        }
       
        
        ></input>
         {
            errors.password?.type==='required' && <p className='lead fs-6 text-success'>Password is required</p>
        }
       </div>
       <div className='mb-1'>
        <label className='form-label mx-3' htmlFor='email'>Email</label>
        <input className='form-control mx-3 w-75' type='email' id="email"
        {
            ...register("email",{required:true})
        }
       
        
        ></input>
         {
            errors.email?.type==='required' && <p className='lead fs-6 text-success'>email is required</p>
        }
       </div>
       <div className='mb-1'>
            <label htmlFor='phoneNo' className='form-label mx-3'>
                Phone No
                 
            </label>
            <input id="phoneNo" className='form-control w-75 mx-3' type="number" {
                ...register("phoneNo",{required:true,minLength:10,maxLength:10})
            }/>
            {
                errors.name?.type==='required' && <p className='lead fs-4 text-success'>Phone number required</p>}
               { errors.name?.type==='minLength' && <p className='lead fs-4 text-success'>Invalid Phone number</p>}
              
            
        </div>
        <div className='mb-1'>
            <label htmlFor='addres' className='form-label mx-3'>
                Address
                 
            </label>
            <input id="addres" className='form-control w-75 mx-3 h-75' type="text" style={{minHeight:"60px"}}
               
            />
           
            
        </div>
       
     
        <div className='text-center mb-1'>
        <button className='btn btn-danger mx-auto mt-3 mb-3' type="submit">Submit</button></div>
         
          </form>
          {
               err.length!==0 && <p className='mx-3'>{err}</p>
          }
          <p className='text-success fs-5 text-center mb-1'>
           <NavLink style={{textDecoration:"None"}} onClick={change} to="/Login">Already Registered</NavLink>
          </p>
        </div>
  )
}

export default Register