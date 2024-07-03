import React, { useState, useEffect } from 'react'
import './Sidebar.css'
import { Avatar, IconButton } from "@mui/material"
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SidebarChat from './SidebarChat';
import { db } from '../firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';


function Sidebar() {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        // Reference to the 'posts' collection
        const roomsCollection = collection(db, 'rooms');

        // Real-time listener for the 'posts' collection
        const unsubscribe = onSnapshot(roomsCollection, (snapshot) => {
            setRooms(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })));
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [])




    return (
        <div className='sidebar'>
            <div className='sidebar__header'>
                <Avatar />
                <div className='sidebar__headerRight'>
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>

                </div>
            </div>
            <div className='sidebar__search'>
                <div className='sidebar__searchContainer'>
                    <SearchOutlinedIcon />
                    <input
                        placeholder='Search or start new chat'
                        type='text'
                    />
                </div>
            </div>
            <div className='sidebar__chats'>

                <SidebarChat addNewChat={true} />
                {rooms.map((room) => {
                    return <SidebarChat
                        key={room.id}
                        id={room.id}
                        name={room.data.name}
                    />
                })}


            </div>
        </div>
    )
}

export default Sidebar
