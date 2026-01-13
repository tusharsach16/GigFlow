import io from 'socket.io-client';
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 
                   import.meta.env.VITE_API_URL || 
                   'http://localhost:5000';

const socket = io(SOCKET_URL, {
    autoConnect: false,
    withCredentials: true,
    transports: ['websocket', 'polling'],
});

export const connectSocket = (userId) => {
    socket.connect();
    socket.emit('join', userId);
};

export const disconnectSocket = () => {
    if (socket.connected) {
        socket.disconnect();
    }
};

export default socket;