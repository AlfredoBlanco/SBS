import io from 'socket.io-client';

let socket = io(`${process.env.NEXT_PUBLIC_API_PATH}/`,{
    rejectUnauthorized: false
});

export default socket;