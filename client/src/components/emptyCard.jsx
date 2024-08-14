import React from 'react'

export default function EmptyCard({  }) {
  return (
    <div className='p-5 flex items-center justify-center flex-col'>
        <img src="Images/addNote.webp" alt="" className='w-96' />
        <p className='text-black'>Click the Add button Icon to add new note</p>
    </div>
  )
}
