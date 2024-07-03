import React from 'react'
import Sidebar from './Sidebar'
import Chat from './Chat'
import './AppPage.css'

function AppPage() {
    return (
        <div className='app__body'>
            <Sidebar />
            <Chat />
        </div>
    )
}

export default AppPage
