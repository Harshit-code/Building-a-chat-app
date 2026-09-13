import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ username, setUsername, room, setRoom, socket }) => {
  const navigate = useNavigate();

  const joinRoom = () => {
    if (room !== '' && username !== '') {
      socket.emit('join_room', { username, room });
      // Redirect to /chat
      navigate('/chat', { replace: true });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-200 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center">ChatApp</h1>
        <input
          className="w-full px-4 py-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <select
          className="w-full px-4 py-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setRoom(e.target.value)}
        >
          <option value="">Select the room</option>
          <option value="Chatroom 1">Chatroom 1</option>
          <option value="Chatroom 2">Chatroom 2</option>
          <option value="Chatroom 3">Chatroom 3</option>
          <option value="Chatroom 4">Chatroom 4</option>
        </select>
        <button
          className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          onClick={joinRoom}
        >
          Join Room
        </button>
      </div>
    </div>
  );
};

export default Home;
