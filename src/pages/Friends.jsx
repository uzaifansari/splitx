import React, { useState, useEffect } from 'react'
import profilePic from "../assets/defaultProfilePic.png"
import NewFriend from '../components/NewFriend'
import NewFriendModal from '../components/NewFriendModal'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const FriendsPage = (props) => {
  const {theme, isModalOpen, toggleModal, newFriendIcon} = props
  const [loading, setLoading] = useState(true)
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"))
  const [friends,setFriends] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    const fetchFriends = async () => {
      if (!isModalOpen) {
        setLoading(true)
        try {
            const currentUserEmail = currentUser.email;
            const response = await axios.post(`https://splitx-backend.onrender.com/friends`, { currentUserEmail });
            setFriends(response.data.friends || []);
            console.log(response.data)
        } catch (error) {
          console.error("Failed to fetch friends:", error);
        } finally {
          setLoading(false)
        } 
      }
    };
    fetchFriends();
  }, [isModalOpen]);

  const handleFriendDetails = (friend) => {
    navigate(`/friend/${friend.email}`, { state: { friend } });
  };
  
  return (
    <div className={`overflow-y-scroll no-scrollbar w-full h-screen flex flex-col gap-2 pt-20 px-3 md:p-24 ${props.theme==="bg-black"?"text-white":"text-black"} ${props.theme}`}>
      <h1 className='text-4xl'>Summary</h1>
      <div className='UNSETTLED w-full h-fit flex flex-col gap-3'>
        <div>
          <h1 className='text-2xl'>Friends</h1>
        </div>
        <div className='flex gap-4 overflow-x-scroll no-scrollbar'>
            {loading ? (
              Array(3).fill().map((_,index) => (
                <div key={index} className='w-fit h-fit flex flex-col shrink-0 gap-1'>
                  <div>
                    {/* Image Skeleton */}
                    <Skeleton className={`rounded-lg w-32 h-32 md:w-40 md:h-40 ${theme=="bg-black"?"bg-zinc-300":"bg-zinc-200"}`} inline/>
                  </div>
                  <div className='w-full flex items-start justify-between'>
                    {/* Text Skeletons */}
                    <Skeleton width={64} height={16} className={`${props.theme=="bg-black"?"bg-zinc-300":"bg-zinc-200"}`}/>
                    <Skeleton width={48} height={16} className={`${props.theme=="bg-black"?"bg-zinc-300":"bg-zinc-200"}`}/>
                  </div>
                </div>
              ))
            ) : (
              friends.map((friend, index) => (
                <button onClick={() => handleFriendDetails(friend)} key={index} className='w-fit h-fit flex flex-col shrink-0 gap-1'>
                    <div>
                        <img src={profilePic} alt="" className='bg-zinc-500 size-32 md:size-40 rounded-lg'/>
                    </div>
                    <div className='w-full flex items-start justify-between'>
                      <div className='max-w-16 text-nowrap truncate text-sm'>{friend.name}</div>
                      <div className={`max-w-16 truncate text-sm ${friend.total_balance >= 0?"text-green-500":"text-red-500"}`}>${friend.total_balance}</div>
                    </div>
                </button>
              ))
            )}
        </div>
      </div>
      {/* <div className='SETTLED w-full h-fit flex flex-col gap-3'>
        <div>
          <h1 className='text-2xl'>Settled Friends</h1>
        </div>
        <div className='flex gap-4 overflow-x-scroll no-scrollbar'>
            
        </div>
      </div> */}
      {/* Button to add new expenses */}
      <NewFriend theme={theme} toggleModal={toggleModal} newFriendIcon={newFriendIcon}/>
      {/* Modal for creating a new expense */}
      {isModalOpen && (
        <NewFriendModal theme={theme} toggleModal={toggleModal}/>
      )}
    </div>
  )
}

export default FriendsPage