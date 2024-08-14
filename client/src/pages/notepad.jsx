import React, { useState, useEffect } from 'react'
import NoteCard from '../components/noteCard'
import { MdAdd } from 'react-icons/md'
import AddEditNote from '../components/addEditNote'
import Modal from 'react-modal'
import { useSelector } from 'react-redux'
import ToastMessage from '../components/toastMessage'
import EmptyCard from '../components/emptyCard.jsx'

export default function Notepad() {
  const {currentUser} = useSelector((state) => state.user)
  const [openAddEditModal, setOpenAddEditModal] = useState({
      isShow: false,
      type: "add",
      data: null
  })
  const [showToast, setShowToast] = useState({
    isShow: false,
    type: "add",
    message: ""
  })
  const [allNote, setAllNote] = useState([])
  const [loading, setIsloading] = useState(false)
  const [error, setError] = useState(null)

  function handleEdit(noteDetails) {
      setOpenAddEditModal({ isShow: true, data: noteDetails, type: "edit" })
  }

  async function getAllNote() {
      try {
        setIsloading(true);
        const response = await fetch(`/report/getUserNote/${currentUser._id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          setAllNote(data.notes)
        } else {
          setError(`Error fetching note: ${response.status}`);
        }
      } catch (err) {
        setError(`Error fetching note: ${err.message}`);
      } finally {
        setIsloading(false);
      }
  }

  async function deleteNote(data){
    try{ 
      const res = await fetch(`/report/deleteUserNote/${currentUser._id}/${data._id}`, {
        method: 'Delete'
      })
      if (res.ok) {
        showToastMessage("Note Deleted Successfully", "delete")
        getAllNote()
      } else {
        setError(`Error deleting note: ${response.status}`)
      }
    } catch (err) {
      setError(`Error deleting note: ${err.message}`)
    }
  }

  async function updatePinNote(noteData){
    const noteId = noteData._id
    try {
      setIsloading(true);
      const response = await fetch(`/report/updatePinNote/${currentUser._id}/${noteData._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({"isPinned": !noteData.isPinned})
      });

      if (response.ok) {
        showToastMessage("Note Updated Successfully")
        getAllNote()
      } else {
        setError(`Error pinning note: ${response.status}`);
      }
    } catch (err) {
      setError(`Error pinning note: ${err.message}`);
    } finally {
      setIsloading(false);
    }
  }

  useEffect(() => {
      getAllNote()
    }, [])

  function showToastMessage(message, type){
    setShowToast({
      isShow: true,
      message,
      type
    })
  }

  function handleCloseToast(){
  setShowToast({
    isShow: false,
    message: ""
  })
}

    

  return (
    <div>
        <div className='container mx-auto'>
          {allNote.length > 0 ? (
            <div className='grid grid-cols-3 gap-4 mt-8'>
                {allNote.map((item, index) => (
                    <NoteCard
                        key={item._id}
                        title={item.title}
                        date={item.createdAt}
                        content={item.content}
                        tags={item.tags}
                        isPinned={item.isPinned}
                        onEdit={() => handleEdit(item)}
                        onDelete={() => deleteNote(item)}
                        onPinNote={() => updatePinNote(item)}
                    />
                ))}
            </div>) : <EmptyCard/>
          }
        </div>
        <button className='flex w-16 h-16 items-center justify-center rounded-2xl bg-purple-500 hover:bg-purple-300 absolute right-10 bottom-10' onClick={() => {
            setOpenAddEditModal({ isShow: true, type: "add", data: null })
        }}>
            <MdAdd className='text-[32px] text-white'/>
        </button>

        <Modal
            isOpen={openAddEditModal.isShow}
            onRequestClose={() => {}}
            style={{
                overlay: {
                    backgroundColor: "rgba(0,0,0,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    
                },
            }}
            contentLabel=""
            className="w-[40%] max-h-3/4 bg-white mx-auto mt-14 p-5 overflow-scroll"
        >
            <AddEditNote
                type={openAddEditModal.type}
                noteData={openAddEditModal.data}
                onClose={() => {
                    setOpenAddEditModal({ isShow: false, type: "add", data: null })
                }}
                getAllNote={getAllNote}
                showToastMessage={showToastMessage}
            />
        </Modal>

        <ToastMessage
          isShow={showToast.isShow}
          type={showToast.type}
          message={showToast.message}
          onClose={handleCloseToast}
        />
    </div>
  )
}