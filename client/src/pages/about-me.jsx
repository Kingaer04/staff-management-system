import React, { useState } from 'react'
import { useSelector } from 'react-redux'

export default function AboutMe() {
    const {currentUser} = useSelector((state) => state.user)

  return (
    <div>
        {!currentUser ? <div></div> : (<div className='flex items-center p-10 gap-16'>
            <div className='flex' style={{ width: "50%", border: "5px solid purple" }}>
                <img src={currentUser.avatar} alt="" style={{ width: "90%" }} />
            </div>
            <div className='text-black'>
                <h2>{currentUser.userName}</h2>
                <p><strong>Department:</strong> {currentUser.department}</p>
                <p><strong>Role:</strong> {currentUser.role}</p>
                <p><strong>Phone Number:</strong> {currentUser.phone}</p>
                <p><strong>Email:</strong> {currentUser.email}</p>
                <p><strong>Skills:</strong> {currentUser.skill}</p>
                <p><strong>Description:</strong> {currentUser.description}</p>
                <button className="edit-button">Edit Profile</button>
            </div>
        </div>) }
    </div>
  )
}