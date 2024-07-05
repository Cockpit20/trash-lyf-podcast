import React, { useState, useEffect } from 'react'
import './Chat.css'
import { Avatar, IconButton } from "@mui/material"
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import MoreVert from '@mui/icons-material/MoreVert';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import InsertEmoticonOutlinedIcon from '@mui/icons-material/InsertEmoticonOutlined';
import MicOutlinedIcon from '@mui/icons-material/MicOutlined';
import { useParams } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { collection, orderBy, query, doc, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { useStateValue } from '../StateProvider';

function Chat() {
    const [seed, setSeed] = useState('');
    const [input, setInput] = useState('');
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState('');
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        if (roomId) {
            const roomDocRef = doc(db, "rooms", roomId);
            onSnapshot(roomDocRef, (snapshot) => {
                if (snapshot.exists()) {
                    setRoomName(snapshot.data().name);
                } else {
                    console.log("No such document!");
                }
            });

            const messagesCollectionRef = collection(db, 'rooms', roomId, 'messages');
            const q = query(messagesCollectionRef, orderBy('timestamp', 'asc'));

            onSnapshot(q, (snapshot) => {
                const messages = snapshot.docs.map((doc) => doc.data());
                setMessages(messages);
            });
        }
    }, [roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [roomId])

    const sendMessage = (event) => {
        event.preventDefault();
        // alert(`You typed >>> ${input}`);
        addDoc(collection(doc(db, "rooms", roomId), "messages"), {
            message: input,
            name: user.displayName,
            timestamp: serverTimestamp(),
        });
        setInput("");
    }

    return (
        <div className='chat'>
            <div className='chat__header'>
                <Avatar
                    src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${seed}`}
                />
                <div className='chat__headerInfo'>
                    <h3>{roomName}</h3>
                    <p>Last seen at{" "}
                        {new Date(messages[messages.length - 1]?.timestamp?.toDate()).toLocaleTimeString('en-GB', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false,
                        })}</p>
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
                {
                    messages.map((message) => {
                        return <p className={`chat__message ${message.name === user.displayName && 'chat__receiver'}`}>
                            <span className='chat__name'>{message.name}</span>
                            {message.message}
                            <span className='chat__timestamp'>{new Date(message.timestamp?.toDate()).toLocaleTimeString('en-GB', {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: false,
                            })}</span>
                        </p>
                    })
                }

                {/* <p className='chat__message'>Hey Guys</p> */}

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
