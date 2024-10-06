import React, { useEffect, useState } from 'react';
import './WidgetStyles.css';

const ChatPlugin = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [chatSocket, setChatSocket] = useState(null); // Manage chatSocket as state

    useEffect(() => {
        const socket = new WebSocket(`${process.env.REACT_APP_BACKEND_URL}/chat`);
        setChatSocket(socket); // Set the socket in state

        socket.onmessage = (event) => {
            displayMessage("Model", event.data);
        };

        return () => {
            socket.close();
        };
    }, []); // No need to include chatSocket in dependency array

    const sendMessage = () => {
        if (input && chatSocket && chatSocket.readyState === WebSocket.OPEN) {
            displayMessage("User", input);
            chatSocket.send(JSON.stringify({ message: input }));
            setInput(''); // Clear input
        }
    };

    const displayMessage = (sender, message) => {
        setMessages(prev => [...prev, { sender, message }]);
    };

    return (
        <div className="plugin">
            <h4>Chat with Model</h4>
            <div className="chat-window">
                {messages.map((msg, index) => (
                    <div key={index} className="message">
                        <strong>{msg.sender}:</strong> {msg.message}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default ChatPlugin;