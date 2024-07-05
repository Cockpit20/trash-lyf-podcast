import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Sidebar from './Components/Sidebar';
import './App.css'
import AppPage from './Components/AppPage';
import { useState } from 'react'
import { useStateValue } from './StateProvider';

function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className='app'>

      {!user ? (
        <Login />
      ) : (
        <div className='app__body'>
          <Router>
            <Routes>
              <Route path='/' element={<Sidebar />} />
              <Route path='/rooms/:roomId' element={<AppPage />} />
            </Routes>
          </Router>
        </div>
      )}

    </div>

  );
}

export default App;
