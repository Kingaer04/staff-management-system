import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signInStart, signInSuccess, signInFailure } from '../redux/userSlice.js'
import { IoIosMail, } from "react-icons/io"
import { RiLockPasswordFill } from "react-icons/ri"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6"


export default function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [isShowPassword, setIsShowPassword] = useState(false)
  const {loading, error} = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  function handleChange(event) {
    const{id, value, name} = event.target
    setFormData(prevData => {
        return {
            ...prevData,
            [name] : value
        }
    })
  }

  function toggleShowPassword() {
    setIsShowPassword(!isShowPassword)
  }
  
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/user/sign-In', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
        credentials: 'include'
      });
      const data = await res.json()
      console.log(data)
      if(data.error) {
        dispatch(signInFailure(data.error))
        return
      }
      dispatch(signInSuccess(data))
      navigate('/')
    } catch (error) {
      dispatch(signInFailure(error.message))
    }
  }

  return (
    <div className='p-3  bg-[#37a1bd] w-screen h-screen '  style={{ backgroundImage: 'url(../../public/Images/BG.png)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center'  }}>
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md'>
      <h1 className='text-3xl text-center my-7 font-semibold text-white'>
        Sign In
      </h1>
      <form onSubmit={handleSubmit} className='flex justify-center gap-2 flex-col text-black'>
        <div className='flex border p-3 rounded-lg bg-white'>
          <IoIosMail size='18px' className='mr-1'/>
          <input type="email" placeholder='Email' className='flex-1 focus:outline-none' id='email' name='email' onChange={handleChange} value={formData.email}/>
        </div>
        <div className='flex border p-3 rounded-lg bg-white'>
          <RiLockPasswordFill size='18px' className='mr-1'/> 
          <input type={isShowPassword ? "text" : "password"} placeholder='Password' className='flex-1 focus:outline-none' id='password' name='password' onChange={handleChange} value={formData.password}/>
          {isShowPassword ? (<FaRegEye
            size={22}
            className='text-purple-400 cursor-pointer'
            onClick={() => toggleShowPassword()}
          />) : (<FaRegEyeSlash
            size={22}  
            className='text-purple-400 cursor-pointer'
            onClick={() => toggleShowPassword()}
          />)}
        </div>
        <button disabled={loading} className='bg-[#512381] text-white uppercase rounded-lg hover:opacity-95 disabled:opacity-85 p-3'>
          {loading ? 'Loading...': 'sign In'}
        </button>
      </form>
      <div className='mt-2'>
      <p className='inline mr-2 text-white'>Dont have an account?</p>
      <Link to={'/sign-In'}>
        <span className='text-blue-700'>Sign Up</span>
      </Link>
      </div>
      {/* {error && <p className='text-red-700'>{error}</p>} */}
      </div>
    </div>
  )
}
