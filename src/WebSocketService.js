import { io } from "socket.io-client";

const socket = io('http://your_backend_url'); // Replace with your backend URL

const WebSocketService = {
    sendMessage: (message) => {
        socket.emit('message', message);
    },
    onMessage: (callback) => {
        socket.on('message', callback);
    },
};

export default WebSocketService;