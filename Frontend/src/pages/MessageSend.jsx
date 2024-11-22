// import React, { useEffect, useState } from "react";
// import io from "socket.io-client";
// import Message from "../components/Messgae";

// // const socket = io("http://localhost:8000");

// const MessageSend = () => {
//   const [messages, setMessages] = useState([]); // Initialize as an array
//   const [messageText, setMessageText] = useState("");

//   useEffect(() => {
//     // Listen for incoming messages
//     socket.on("message", (message) => {
//       setMessages((prevMessages) => [...prevMessages, message]); // Functional state update
//     });

//     // Cleanup on unmount
//     return () => {
//       socket.off("message");
//     };
//   }, []);

//   const sendMessage = () => {
//     if (messageText.trim()) {
//       socket.emit("sendMessage", { text: messageText }); // Emit message to the server
//       setMessageText(""); // Clear input field
//     }
//   };

//   return (
//     <div className="flex flex-col h-[70vh] bg-gray-800">
//       {/* Header */}
//       <header className="bg-gary-800 text-white text-center py-4">
//         <h1 className="text-2xl font-bold">Start Chat with friends</h1>
//       </header>

//       {/* Messages Section */}
//       <div className="flex-grow overflow-y-auto p-4 bg-gray-800 shadow-inner">
//         <div className="space-y-4">
//           {messages.map((message, index) => (
//             <Message
//               key={index}
//               username={message.username}
//               text={message.text}
//             />
//           ))}
//         </div>
//       </div>
//       <footer className="bg-gray-800 p-4">
//         <div className="flex items-center space-x-4">
//           <input
//             type="text"
//             value={messageText}
//             onChange={(e) => setMessageText(e.target.value)}
//             placeholder="Type your message..."
//             className="flex-grow px-4 py-2 text-black border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//           <button
//             onClick={sendMessage}
//             className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
//           >
//             Send
//           </button>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default MessageSend;



import React from 'react'

function MessageSend() {
  return (
    <div>MessageSend</div>
  )
}

export default MessageSend