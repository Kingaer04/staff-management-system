import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateStart, updateSuccess, updateFailure } from '../redux/userSlice'
import { useTheme } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function EditStaffInfo() {
    const { id } = useParams()
    const [Success, setSuccess] = useState(false)
    const [error, setError] = useState(null)
    const [formData, setFormData] = useState([])
    const dispatch = useDispatch()
    const theme = useTheme()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true)
                const response = await fetch(`/employee/update/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                      },
                      credentials: 'include'
                    });
                    const data = await response.json()
                    setFormData(data)
                    setLoading(false)
                  } catch (error) {
                    console.log(error)
                    setLoading(false)
                  }
                }
            fetchData()
        }, [id])

    async function handleSubmit(e) {
        e.preventDefault()
        try {
          dispatch(updateStart())
          const res = await fetch(`/employee/update/${id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
            credentials: 'include'
          });
          const data = await res.json()
          if(data.error) {
            dispatch(updateFailure (data.error))
            setSuccess(false)
            setError(data.error)
            return
          }
          dispatch(updateSuccess(data))
          navigate('/staffs')
          setSuccess(true)
          setError(null)
        } catch (error) {
          dispatch(updateFailure(error))
          setSuccess(false)
          setError(error.error)
        }
    
    }

    function handleChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value})
    }
  return (
    <div className='max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7' style={{ color: theme.palette.secondary[500] }}>Edit Staff Data</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'> 
        <img src= {formData.avatar} alt="profile_image" className='self-center rounded-full cursor-pointer w-20 h-20 object-cover object-center'/>
        <input type="text" placeholder='UserName' className='border p-3 rounded-lg' id='userName' name='userName' value={formData.userName} onChange={handleChange} style={{ color: "#000" }} disabled/>
        <input type="email" placeholder='Email' className='border p-3 rounded-lg' id='email' name='email' value={formData.email} onChange={handleChange} style={{ color: "#000" }} disabled/>
        <input type="password" placeholder='OldPassword' className='border p-3 rounded-lg' id='oldPassword' name='oldPassword' onChange={handleChange} style={{ color: "#000" }} disabled/> 
        <input type="password" placeholder='NewPassword' className='border p-3 rounded-lg' id='newPassword' name='newPassword'  onChange={handleChange} style={{ color: "#000" }} disabled/>
        <div className='flex border p-3 rounded-lg text-black'>
          <select className='flex-1 focus:outline-none' id='department' name='department' onChange={handleChange} value={formData.department}>
            <option value="">Department</option>
            <option value="DAS">DAS</option>
            <option value="DEM">DEM</option>
            <option value="DPA">DPA</option>
            <option value="RCD">RCD</option>
            <option value="AHR">AHR</option>
          </select>
        </div>
        <div className='flex border p-3 rounded-lg text-black'>
          <select className='flex-1 focus:outline-none' id='role' name='role' onChange={handleChange} value={formData.role}>
            <option value="">Role</option>
            <option value="staff">Staff</option>
            <option value="HOD">HOD</option>
            <option value="IT">IT</option>
            <option value="corper">Corper</option>
          </select>
        </div>
        <button disabled={loading} className='text-white uppercase rounded-lg hover:opacity-95 disabled:opacity-85 p-3' style={{ backgroundColor: theme.palette.secondary[500] }}>
          {loading ? 'loading':'update'}
        </button>
      </form>
      <p className="text-red-700 mt-5">{error ? error:''}</p>
      <p className="text-green-700 mt-5">{Success ? 'User Account has been updated successfully!':''}</p>
    </div>
  )
}
