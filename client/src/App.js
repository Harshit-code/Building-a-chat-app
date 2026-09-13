import logo from './logo.svg';
import './App.css';
import { useState } from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import io from 'socket.io-client';
import Home from './pages/home';
import Chat from './pages/chat';
import Header from './pages/home/header';
const socket = io('http://localhost:4000'); //  -- our server will run on port 4000, so we connect to it from here
function App() {
  const [username, setUsername] = useState(''); // Add this
  const [room, setRoom] = useState(''); // Add this
  return (
    <Router>
      <div className='App'>
        <Header/>
        <Routes>
          <Route
            path='/'
            element={
              <Home
                username={username}  
                setUsername={setUsername} 
                room={room} 
                setRoom={setRoom} 
                socket={socket} 
              />
            }
          />
          <Route
            path='/chat'
            element={<Chat username={username} room={room} socket={socket} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;