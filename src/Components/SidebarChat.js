import React, { useState, useEffect } from 'react'
import { Avatar } from "@mui/material"
import './SidebarChat.css'
import { db } from '../firebaseConfig';
import { collection, addDoc } from "firebase/firestore";
import { Link } from 'react-router-dom';

function SidebarChat({ addNewChat, id, name }) {
    const [seed, setSeed] = useState('');

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [])

    const createChat = () => {
        const roomName = prompt("Please enter name for chat");

        if (roomName) {
            // alert(`Sorry ${roomName}! Our Service is Under Maintenance right now. Try again later.`)

            addDoc(collection(db, "rooms"), {
                name: roomName,
            })
        }
    }

    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className='sidebarChat'>
                <Avatar
                    src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${seed}`}
                />
                <div className='sidebarChat__info'>
                    <h2>{name}</h2>
                    <p>Last message...</p>
                </div>
            </div>
        </Link>

    ) : (
        <div onClick={createChat} className='sidebarChat'>
            <h2>Add New Chat</h2>
        </div>
    )
}

export default SidebarChat
