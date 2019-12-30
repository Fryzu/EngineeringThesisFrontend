import io from 'socket.io-client';
import { testAction } from '../actions/user';

const SERVER_URL = 'http://localhost:5000';

const createSocketConnection = ({ dispatch }) => {
  const socket = io.connect(SERVER_URL, {
    'reconnection delay': 0,
    'reopen delay': 0,
    'force new connection': true,
    transports: ['websocket'],
  });

  socket.on('test', payload => {
    console.warn('Test event received', payload);
    dispatch(testAction(payload));
  });

  return socket;
};

export default createSocketConnection;
