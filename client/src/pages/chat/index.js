import MessagesReceived from './messages';
import RoomAndUsersColumn from './room-and-users';
import SendMessage from './send-message';

const Chat = ({ username, room, socket }) => {
  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-5">
      <RoomAndUsersColumn socket={socket} username={username} room={room} />
      <div className="col-span-4 flex flex-col">
        <MessagesReceived socket={socket} className="flex-grow overflow-auto p-4" />
        <SendMessage socket={socket} username={username} room={room} className="fixed bottom-0 w-full md:w-4/5 bg-white p-4 border-t border-gray-200" />
      </div>
    </div>
  );
};

export default Chat;
