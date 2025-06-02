import io from 'socket.io-client';

export default   socket = io.connect('https://serverjob.vercel.app', {
  withCredential: false,
  extraHeaders: {
    'Content-Type': 'application/json',
  }
});