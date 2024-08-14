import { useState, React } from 'react'
import TagInput from './tagInput'
import { MdClose } from 'react-icons/md'
import { useSelector } from 'react-redux'

export default function AddEditNote({ noteData, getAllNote, type, onClose, showToastMessage }) {
  const {currentUser} = useSelector((state) => state.user)
  const [title,setTitle] = useState(noteData?.title || "")
  const [content, setContent] = useState(noteData?.content || "")
  const [tags, setTags] = useState(noteData?.tags || [])
  const [error, setError] = useState(null)
  const [loading, setIsloading] = useState(false)
  console.log(title)

  const addNewNote = async (title, content, tags) => {
    try {
      setIsloading(true);
      const response = await fetch(`/report/userNote/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content, tags }),
      });

      if (response.ok) {
        showToastMessage("Note Added Successfully")
        getAllNote();
        onClose();
      } else {
        setError(`Error creating new note: ${response.status}`);
      }
    } catch (err) {
      setError(`Error creating new note: ${err.message}`);
    } finally {
      setIsloading(false);
    }
  }

  async function editNote(){
    try {
      setIsloading(true);
      const response = await fetch(`/report/editUserNote/${currentUser._id}/${noteData._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content, tags })
      });

      if (response.ok) {
        showToastMessage("Note Updated Successfully")
        getAllNote();
        onClose();
      } else {
        setError(`Error creating new note: ${response.status}`);
      }
    } catch (err) {
      setError(`Error creating new note: ${err.message}`);
    } finally {
      setIsloading(false);
    }
  }

  function handleAddNote() {
    if(!title) {
      setError("Please enter the title")
      return
    }

    if(!content) {
      setError("Pleaseenter the content")
      return
    }

    setError("")

    if(type === 'edit') {
      editNote(title, content, tags)
    }
    else {
      addNewNote(title, content, tags)
    }
  }

  return (
    <div className='text-black relative'>
      <button className='w-1o h-10 rounded-full p-2 flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50' onClick={onClose}>
        <MdClose className='text-xl text-slate-400'/>
      </button>
      <div className='flex flex-col gap-2'>
        <label className='input-label'>
          TITLE
        </label>
        <input type="text" className='text-2xl text-slate-950 outline-none' placeholder='Go To Gym At 5' value={title} onChange={({target}) => setTitle(target.value)}/>
      </div>
      <div className='flex flex-col gap-2 mt-4'>
        <label className='input-label'>
          CONTENT
        </label>
        <textarea type="text" className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded" placeholder='Content' rows={10} value={content} onChange={({target}) => setContent(target.value)}/>
      </div>
      
      <div className='mt-3'>
        <label className="input-label">
          TAGS
        </label>
        <TagInput tags={tags} setTags={setTags}/>
      </div>
      {error && <p className='text-red-500 text-xs pt-4'>{error}</p>}
      <button className='bg-purple-500 font-bold mt-5 p-3 w-full rounded-md text-white' onClick={handleAddNote}>
        {type === "edit" ? "UPDATE" : "ADD"}
      </button>
    </div>
  )
}
