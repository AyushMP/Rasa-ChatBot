// App.js

import React, { useState } from 'react';
import './App.css'; // Import CSS file for styling

function App() {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    // Send user message to Rasa server and receive response
    const response = await fetch('http://localhost:5005/webhooks/rest/webhook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: inputText }),
    });

    const data = await response.json();
    const botMessage = data[0].text;
    
    // Update messages state with bot response
    setMessages([...messages, { user: inputText }, { bot: botMessage }]);
    setInputText('');
  };

  return (
    <div className="app-container">
      <div className="chat-container">
        {messages.map((message, index) => (
          <div key={index} className={message.user ? 'user-message' : 'bot-message'}>
            {message.user && <div>User: {message.user}</div>}
            {message.bot && <div>Bot: {message.bot}</div>}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          className="input-field"
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your message..."
        />
        <button className="send-button" onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
