import React, { useState } from 'react'
import { MdAdd, MdClose } from 'react-icons/md'

export default function TagInput({ tags, setTags }) {
    const [inputValue, setInputValue] = useState("")

    function handleInputChange(e) {
        setInputValue(e.target.value)
    }

    function addNewTag() {
        if(inputValue.trim() !== "") {
            setTags([...tags, inputValue.trim()]) //Adding new tags
            setInputValue("")
        }
    }

    function handleKeyDown(e) {
        if(e.key === "Enter") {
            addNewTag()
        }
    }

    function handleRemoveTag(tagToRemove) {
        setTags(tags.filter((tag) => tag !== tagToRemove))
    }

  return (
    <div>
        <div className='flex items-center gap-2 flex-wrap mt-2 text-black'>
            {tags?.map((tag, index) => (
                <span key={index} className='bg-purple-200 px-2 py-1 rounded-full flex items-center gap-2 text-sm text-slate-900'>
                    # {tag}
                    <button onClick={() => {handleRemoveTag(tag)}}><MdClose className='ml-2 text-purple-700'/></button>
                </span>
            ))}
        </div>
        <div className='flex items-center gap-4 mt-3'>
            <input type="text" className='text-sm bg-transparent border px-3 py-2 rounded outline-none focus:border-none focus:outline-purple-900 focus:outline-2 focus:outline' placeholder='Add tags' onChange={handleInputChange} onKeyDown={handleKeyDown} value={inputValue}/>

            <button className='flex w-8 h-8 items-center justify-center rounded border border-purple-700 hover:bg-purple-700' onClick={addNewTag}>
                <MdAdd className='text-2xl text-purple-700 hover:text-white'/>
            </button>
        </div>
    </div>
  )
}
