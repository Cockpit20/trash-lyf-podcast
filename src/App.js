import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Components/HomePage';
import Sidebar from './Components/Sidebar';
import './App.css'
import AppPage from './Components/AppPage';

function App() {
  return (
    <div className='app'>
      <div className='app__body'>
        <Router>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/app' element={<Sidebar />} />
            <Route path='/rooms/:roomId' element={<AppPage />} />
          </Routes>
        </Router>
      </div>
    </div>

  );
}

export default App;
