import io from 'socket.io-client';

let socket = io(String(process.env.NEXT_PUBLIC_API_PATH));

export default socket;