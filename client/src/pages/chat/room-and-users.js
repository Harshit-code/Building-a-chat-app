import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RoomAndUsers = ({ socket, username, room }) => {
  const [roomUsers, setRoomUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const handleChatroomUsers = (data) => {
      setRoomUsers(data);
    };

    socket.on('chatroom_users', handleChatroomUsers);

    return () => {
      socket.off('chatroom_users', handleChatroomUsers);
    };
  }, [socket]);

  const leaveRoom = () => {
    const leaveData = {
      username,
      room,
      createdTime: Date.now(),
    };
    socket.emit('leave_room', leaveData);
    navigate('/', { replace: true });
  };

  return (
    <div className="left-0 p-6 rounded-lg shadow-md space-y-4 bg-gray-100">
      <div className="text-left">
        <h2 className="text-2xl font-bold text-black uppercase">{room}</h2>

        {roomUsers.length > 0 && (
          <div>
            <h5 className="text-sm font-semibold text-gray-800">Users:</h5>
            <ul className="divide-y divide-gray-200">
              {roomUsers.map((user) => (
                <li
                  key={user.id}
                  className={`py-2 ${user.username === username ? 'font-bold' : 'font-normal'}`}
                >
                  {user.username}
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          className="px-4 py-2 bg-red-700 text-white rounded-md shadow-md hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-maroon-500"
          onClick={leaveRoom}
        >
          Exit the chatroom
        </button>
      </div>
    </div>
  );
};

export default RoomAndUsers;
