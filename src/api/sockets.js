import io from 'socket.io-client';
import { testAction } from '../actions/user';
import { setChannelList, setUserList } from '../actions/server';

const SERVER_URL = 'http://localhost:5000';

const eventNames = {
  TEST: 'test',
  ADD_USER: 'addUser',
  SEND_TO_USER: 'sendToUser',
  SEND_TO_CHANNEL: 'sendToChannel',
};

const createSocketConnection = ({ dispatch }) => {
  const socket = io.connect(SERVER_URL, {
    'reconnection delay': 0,
    'reopen delay': 0,
    'force new connection': true,
    transports: ['websocket'],
  });

  socket.on(eventNames.TEST, payload => {
    console.log('Test event received', payload);
    dispatch(testAction(payload));
  });

  socket.on(eventNames.ADD_USER, ({ payload }) => {
    const { channels, users } = payload;
    dispatch(setChannelList(channels));
    dispatch(setUserList(users));
  });

  socket.on(eventNames.SEND_TO_USER, payload => {
    alert('new message', payload);
  });

  socket.on(eventNames.SEND_TO_CHANNEL, payload => {
    alert('new channel message', payload);
  });

  return socket;
};

export default createSocketConnection;
