import React, { useState, useEffect } from 'react'
import AddGroup from '../components/AddGroup'
import profilePic from "../assets/defaultProfilePic.png"
import NewGroupModal from '../components/NewGroupModal'
import axios from 'axios'

const GroupsPage = (props) => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"))
  const currentUserEmail = currentUser.email
  const [groups, setGroups] = useState([])

  useEffect(() => {
    const fetchGroups = async ()=> {
      try {
        if (!props.isModalOpen) {
          const response = await axios.post(`${BASE_URL}/groups`, {"email": currentUserEmail}) 
          setGroups(response.data.groups);
        }
      } catch (error) {
        console.error("Failed to fetch groups:", error);
      }
    }
    fetchGroups()
  }, [props.isModalOpen])
  
  return (
    <div className={`overflow-y-scroll no-scrollbar w-full h-screen flex flex-col gap-2 pt-20 px-3 md:p-24 ${props.theme==="bg-black"?"text-white":"text-black"} ${props.theme}`}>
      <h1 className='text-4xl'>Summary</h1>
      <div className='UNSETTLED w-full h-fit flex flex-col gap-3'>
        <div>
          <h1 className='text-2xl'>Unsettled Groups</h1>
        </div>
        <div className='flex gap-4 overflow-x-scroll no-scrollbar'>
          {groups.map( (group, index) => (
            <button key={index} className='w-fit h-fit flex flex-col shrink-0 gap-1'>
              <div>
                <img src={profilePic} alt="" className='bg-zinc-500 size-32 md:size-40 rounded-lg'/>
              </div>
              <div>
                {group.group_name}
              </div>
            </button>
          ))}
        </div>
      </div>
      <div className='SETTLED w-full h-fit flex flex-col gap-3'>
        <div>
          <h1 className='text-2xl'>Settled Groups</h1>
        </div>
        <div className='flex gap-4 overflow-x-scroll no-scrollbar'>
            
        </div>
      </div>
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