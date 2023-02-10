import io from 'socket.io-client';

let socket = io(`${process.env.NEXT_PUBLIC_API_PATH}`, {
    transports: [ "websocket", "polling" ],
    withCredentials: true,
  });

export default socket;