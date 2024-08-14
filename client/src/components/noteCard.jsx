import React from 'react'
import { MdOutlinePushPin } from "react-icons/md"
import { MdCreate, MdDelete } from 'react-icons/md'
import moment from 'moment'

export default function NoteCard({ title, date, content, tags, isPinned, onEdit, onDelete, onPinNote }) {
  return (
    <div className='p-5 text-black'>
        <div className='p-4 border rounded bg-white hover:shadow-xl transition-all ease-in-out'>
            <div className='flex items-center justify-between'>
                <div>
                    <h6 className='text-sm font-medium'>{title}</h6>
                    <span className='text-xs text-slate-500'>{moment(date).format('Do MMM YYYY')}</span>
                </div>
                <MdOutlinePushPin className={`icon-btn ${isPinned ? 'text-purple-500': 'text-slate-300'}`} onClick={onPinNote}/>
            </div>

            <p className='text-xs text-slate-600 mt-2 break-words'>{content}</p>

            <div className='flex items-center justify-between mt-2'>
                <div className='text-xs text-slate-500'>{tags.map((item) => `#${item} `)}</div>

                <div className='flex items-center gap-2'>
                    <MdCreate
                        className='icon-btn hover:text-purple-500'
                        onClick={onEdit}
                    />
                    <MdDelete
                        className='icon-btn hover:text-red-500'
                        onClick={onDelete}
                    />
                </div>
            </div>
        </div>
    </div>
  )
}