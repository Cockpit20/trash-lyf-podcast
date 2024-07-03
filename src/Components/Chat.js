import React, { useState, useEffect } from 'react'
import './Chat.css'
import { Avatar, IconButton } from "@mui/material"
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import MoreVert from '@mui/icons-material/MoreVert';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import InsertEmoticonOutlinedIcon from '@mui/icons-material/InsertEmoticonOutlined';
import MicOutlinedIcon from '@mui/icons-material/MicOutlined';

function Chat() {
    const [seed, setSeed] = useState('');
    const [input, setInput] = useState('');

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [])

    const sendMessage = (event) => {
        event.preventDefault();
        alert(`You typed >>> ${input}`);
    }

    return (
        <div className='chat'>
            <div className='chat__header'>
                <Avatar
                    src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${seed}`}
                />
                <div className='chat__headerInfo'>
                    <h3>Room name</h3>
                    <p>Last seen at ...</p>
                </div>
                <div className='chat__headerRight'>
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFileOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className='chat__body'>
                <p className={`chat__message ${true && 'chat__receiver'}`}>
                    <span className='chat__name'>Cockpit02</span>
                    Hey Guys
                    <span className='chat__timestamp'>17:14</span>
                </p>
                <p className='chat__message'>Hey Guys</p>

            </div>
            <div className='chat__footer'>
                <InsertEmoticonOutlinedIcon />
                <form>
                    <input value={input} onChange={(e) => setInput(e.target.value)} placeholder='Type a message' type='text' />
                    <button onClick={sendMessage} type='submit'>Send a message</button>
                </form>
                <MicOutlinedIcon />
            </div>

        </div>
    )
}

export default Chat
