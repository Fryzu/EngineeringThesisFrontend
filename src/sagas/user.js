import { takeEvery, put, call } from 'redux-saga/effects';
import { userActionTypes, setChannelAuthor } from '../actions/user';
import {
  setChannelList,
  setUserList,
  serverActionTypes,
  setChannelListeners,
} from '../actions/server';

function testSaga() {
  console.log('testSaga');
}

const socketConnection = (socket, eventName, params) => {
  return new Promise(resolve => {
    socket.emit(eventName, params, response => {
      const { payload } = response;
      resolve(payload);
    });
  });
};

function* addUserSaga(socket, action) {
  const { type, payload } = action;

  const { channels, users } = yield call(
    socketConnection,
    socket,
    type,
    payload,
  );

  yield put(setChannelList(channels));
  yield put(setUserList(users));
}

function* openChannelSaga(socket, action) {
  const { type, payload } = action;

  const { channels } = yield call(socketConnection, socket, type, payload);

  yield put(setChannelList(channels));
}

function* closeChannelSaga(socket, action) {
  const { type } = action;

  const { channels } = yield call(socketConnection, socket, type, null);

  yield put(setChannelList(channels));
}

function* addMeToChannelSaga(socket, action) {
  const { type, payload } = action;

  const { author } = yield call(socketConnection, socket, type, payload);

  yield put(setChannelAuthor(author));
}

function* sendToUserSaga(socket, action) {
  const { type, payload } = action;

  yield call(socketConnection, socket, type, payload);
}

function* sendToChannelSaga(socket, action) {
  const { type, payload } = action;

  yield call(socketConnection, socket, type, payload);
}

function* getChannelListenersSaga(socket, action) {
  const { type, payload } = action;

  const { listeners } = yield call(socketConnection, socket, type, payload);

  yield put(setChannelListeners(listeners));
}

export default function* user(params) {
  yield takeEvery(userActionTypes.TEST_ACTION, testSaga);
  yield takeEvery(userActionTypes.ADD_USER, addUserSaga, params.socket);
  yield takeEvery(userActionTypes.OPEN_CHANNEL, openChannelSaga, params.socket);
  yield takeEvery(
    userActionTypes.CLOSE_CHANNEL,
    closeChannelSaga,
    params.socket,
  );
  yield takeEvery(
    userActionTypes.ADD_ME_TO_CHANNEL,
    addMeToChannelSaga,
    params.socket,
  );
  yield takeEvery(
    serverActionTypes.SEND_TO_USER,
    sendToUserSaga,
    params.socket,
  );
  yield takeEvery(
    serverActionTypes.SEND_TO_CHANNEL,
    sendToChannelSaga,
    params.socket,
  );
  yield takeEvery(
    serverActionTypes.GET_CHANNEL_LISTENERS,
    getChannelListenersSaga,
    params.socket,
  );
}
