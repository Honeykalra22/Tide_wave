import React, { useContext, useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "../Context/AuthContext";
import { ThemeContext } from "../Context/ThemeContext";

const Message = () => {
  const socket = useMemo(
    () => io('http://localhost:8000', {
      withCredentials: true,
    }),
    []
  )

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState("");
  const [roomName, setRoomName] = useState('')

  const { user } = useContext(AuthContext);
  const { darkMode } = useContext(ThemeContext)

  useEffect(() => {

    socket.on("connect", () => {
      console.log("User connected:", socket.id);
    });

    socket.on("receive-message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    socket.on('welcome', (s) => {
      console.log(s);
    })

    return () => {
      socket.disconnect();
      console.log("User disconnected");
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", { message, room })
    setMessage('')
  };

  const handleJoinRoom = (e) => {
    e.preventDefault();
    socket.emit('join-room', roomName)
    setRoomName('')
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center p-6 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"
        }`}
    >
      <h1 className="text-3xl font-bold mb-4">
        Welcome, <span className="text-blue-500">User</span>
      </h1>

      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2 text-gray-200">
          Messages
        </h2>

        {/* Join Room Form */}
        <div className="mb-6">
          <form onSubmit={handleJoinRoom} className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Enter Room Name..."
              className={`flex-1 p-2 border rounded-md ${darkMode
                  ? "text-gray-200 bg-gray-700 focus:ring-blue-500"
                  : "text-gray-800 bg-gray-100 focus:ring-blue-500"
                }`}
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
            >
              Join Room
            </button>
          </form>
        </div>

        {/* Message Form */}
        <form onSubmit={handleSubmit} className="flex items-center space-x-4 mb-6">
          <input
            type="text"
            placeholder="Type a message..."
            className={`flex-1 p-2 border rounded-md ${darkMode
                ? "text-gray-200 bg-gray-700 focus:ring-blue-500"
                : "text-gray-800 bg-gray-100 focus:ring-blue-500"
              }`}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <input
            type="text"
            placeholder="Room Name..."
            className={`flex-1 p-2 border rounded-md ${darkMode
                ? "text-gray-200 bg-gray-700 focus:ring-blue-500"
                : "text-gray-800 bg-gray-100 focus:ring-blue-500"
              }`}
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 focus:ring-2 focus:ring-green-500"
          >
            Send
          </button>
        </form>

        {/* Message Display */}
        <div className="space-y-3">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`rounded-md p-3 ${darkMode ? "bg-gray-700 text-gray-200" : "bg-gray-200 text-gray-800"
                }`}
            >
              <strong>{msg.sender}: </strong>
              {msg.message}
            </div>
          ))}
        </div>
      </div>
    </div>


  );
};

export default Message;