// src/components/Messages.js
import React, { useState } from 'react';
import { useMsal } from '@azure/msal-react';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { accounts } = useMsal();

  const handleSendMessage = () => {
    // Assuming a simple structure for messages with sender's email
    const senderEmail = accounts.length > 0 ? accounts[0].username : 'Anonymous';
    const newMessageObj = { sender: senderEmail, content: newMessage };
    
    setMessages([...messages, newMessageObj]);
    setNewMessage('');
  };

  return (
    <div className="container mt-4">
      <h2>Messages</h2>

      <div className="mb-3">
        <textarea
          className="form-control"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        ></textarea>
        <button className="btn btn-primary mt-2" onClick={handleSendMessage}>
          Send Message
        </button>
      </div>

      {messages.length > 0 ? (
        <ul className="list-group">
          {messages.map((message, index) => (
            <li key={index} className="list-group-item">
              <strong>{message.sender}</strong>: {message.content}
            </li>
          ))}
        </ul>
      ) : (
        <p>No messages yet.</p>
      )}
    </div>
  );
};

export default Messages;
