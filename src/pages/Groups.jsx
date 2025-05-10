import React, { useState, useEffect } from 'react'
import AddGroup from '../components/AddGroup'
import profilePic from "../assets/defaultProfilePic.png"
import NewGroupModal from '../components/NewGroupModal'
import axios from 'axios'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const GroupsPage = (props) => {
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"))
  const currentUserEmail = currentUser.email
  const [groups, setGroups] = useState([])
  const [loading,setLoading] = useState(true)

  useEffect(() => {
    const fetchGroups = async ()=> {
      if (props.isModalOpen) return; 
      setLoading(true)

      try {
        const response = await axios.post(`https://splitx-backend.onrender.com/groups`, {"email": currentUserEmail}) 
        setGroups(response.data.groups);
      } catch (error) {
        console.error("Failed to fetch groups:", error);
      } finally {
        setLoading(false)
      }
    };
    fetchGroups()
  }, [props.isModalOpen])
  
  return (
    <div className={`overflow-y-scroll no-scrollbar w-full h-screen flex flex-col gap-2 pt-20 px-3 md:p-24 ${props.theme==="bg-black"?"text-white":"text-black"} ${props.theme}`}>
      <h1 className='text-4xl'>Summary</h1>
      <div className='UNSETTLED w-full h-fit flex flex-col gap-3'>
        <div>
          <h1 className='text-2xl'>Groups</h1>
        </div>
        <div className='flex gap-4 overflow-x-scroll no-scrollbar'>
          {loading ? (
            Array(3).fill().map((_,index) => (
              <div key={index} className='w-fit h-fit flex flex-col shrink-0 gap-1'>
                <div>
                  <Skeleton className={`rounded-lg w-32 h-32 md:w-40 md:h-40 ${props.theme=="bg-black"?"bg-zinc-300":"bg-zinc-200"}`} inline/>
                </div>
                <div className='w-full flex items-start justify-between'>
                  <Skeleton width={64} height={16} className={`${props.theme=="bg-black"?"bg-zinc-300":"bg-zinc-200"}`}/>
                  <Skeleton width={48} height={16} className={`${props.theme=="bg-black"?"bg-zinc-300":"bg-zinc-200"}`}/>
                </div>
              </div>
            ))
          ) : (
            groups.length > 0 ? (
              groups.map( (group, index) => (
              <button key={index} className='w-fit h-fit flex flex-col shrink-0 gap-1'>
                <div>
                  <img src={profilePic} alt="" className='bg-zinc-500 size-32 md:size-40 rounded-lg'/>
                </div>
                <div>
                  {group.group_name}
                </div>
              </button>
              ))
            ) : (
              <p className="italic text-gray-500 text-sm md:text-xl">You haven't created any groups yet.</p>
            )
          )}
        </div>
      </div>
      {/* <div className='SETTLED w-full h-fit flex flex-col gap-3'>
        <div>
          <h1 className='text-2xl'>Settled Groups</h1>
        </div>
        <div className='flex gap-4 overflow-x-scroll no-scrollbar'>
            
        </div>
      </div> */}
      {/* Button to add new group */}
      <AddGroup theme={props.theme} toggleModal={props.toggleModal} plusIcon={props.plusIcon}/>
      {/* Modal for creating a new expense */}
      {props.isModalOpen && (
        <NewGroupModal toggleModal={props.toggleModal} theme={props.theme} isModalOpen={props.isModalOpen}/>
      )}
    </div>
  )
}

export default GroupsPage