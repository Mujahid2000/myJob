import io from 'socket.io-client';

export default   socket = io.connect('https://job-server-1.onrender.com', {
  withCredential: false,
  extraHeaders: {
    'Content-Type': 'application/json',
  }
});