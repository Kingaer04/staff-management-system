import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { IoIosMail, } from "react-icons/io"
import { FaUser } from "react-icons/fa"
import { RiLockPasswordFill } from "react-icons/ri"


export default function SignUp() {
  const [formData, setFormData] = React.useState({
    userName: '',
    email: '',
    password: '',
    address: '',
    department: ''
  })
  const [error, setError] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const navigate = useNavigate()

  function handleChange(event) {
    const{id, value, name} = event.target
    setFormData(prevData => {
        return {
            ...prevData,
            [name] : value
        }
    })
  }
  
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/user/signUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      console.log(data)
      if(data.error) {
        setLoading(false)
        setError(data.message)
        return
      }
      setLoading(false)
      setError(null)
      navigate('/staffs')
    } catch (error) {
      setLoading(false)
      // setError(error.message)
    }
  }


  return (
    <div className='p-3  bg-[#37a1bd] w-screen h-screen '  style={{ backgroundImage: 'url(../../public/Images/BG.png)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center'  }}>
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md'>
      <h1 className='text-3xl text-center my-7 font-semibold text-white'>
        ADD STAFF
      </h1>
      <form onSubmit={handleSubmit} className='flex justify-center gap-2 flex-col text-black'>
        <div className='flex border p-3 rounded-lg bg-white'>
          <FaUser size='18px' className='mr-1'/>
          <input type="text" placeholder='FullName' className='flex-1 focus:outline-none' id='userName' name='userName' onChange={handleChange} value={formData.userName}/>
        </div>
        <div className='flex border p-3 rounded-lg bg-white'>
          <IoIosMail size='18px' className='mr-1'/>
          <input type="email" placeholder='Email' className='flex-1 focus:outline-none' id='email' name='email' onChange={handleChange} value={formData.email}/>
        </div>
        <div className='flex border p-3 rounded-lg bg-white'>
          <RiLockPasswordFill size='18px' className='mr-1'/> 
          <input type="password" placeholder='Password' className='flex-1 focus:outline-none' id='password' name='password' onChange={handleChange} value={formData.password}/>
        </div>
        <div className='flex border p-3 rounded-lg bg-white'>
          {/* <RiLockPasswordFill size='18px' className='mr-1'/>  */}
          <input type="number" placeholder='Phone Number' className='flex-1 focus:outline-none' id='phone' name='phone' onChange={handleChange} value={formData.phone}/>
        </div>
        <div className='flex border p-3 rounded-lg bg-white'>
          <select className='flex-1 focus:outline-none' id='department' name='department' onChange={handleChange} value={formData.department}>
            <option value="">Department</option>
            <option value="DAS">DAS</option>
            <option value="DEM">DEM</option>
            <option value="DPA">DPA</option>
            <option value="RCD">RCD</option>
            <option value="AHR">AHR</option>
          </select>
        </div>
        <div className='flex border p-3 rounded-lg bg-white'>
          <select className='flex-1 focus:outline-none' id='role' name='role' onChange={handleChange} value={formData.role}>
            <option value="">Role</option>
            <option value="staff">Staff</option>
            <option value="HOD">HOD</option>
            <option value="IT">IT</option>
            <option value="corper">Corper</option>
            {/* <option value="AHR">AHR</option> */}
          </select>
        </div>
        <div className='flex border p-3 rounded-lg bg-white'>
          {/* <RiLockPasswordFill size='18px' className='mr-1'/>  */}
          <input type="text" placeholder='Address' className='flex-1 focus:outline-none' id='address' name='address' onChange={handleChange} value={formData.address}/>
        </div>
        <button disabled={loading} className='bg-[#512381] text-white uppercase rounded-lg hover:opacity-95 disabled:opacity-85 p-3'>
          {loading ? 'Loading...': 'ADD STAFF'}
        </button>
      </form>
      {error && <p className='text-red-700'>{error}</p>}
      </div>
    </div>
  )
}
