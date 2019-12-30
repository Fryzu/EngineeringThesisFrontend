import { takeEvery, put, call } from 'redux-saga/effects';
import { userActionTypes } from '../actions/user';
import { setChannelList, setUserList } from '../actions/server';

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

export default function* user(params) {
  yield takeEvery(userActionTypes.TEST_ACTION, testSaga);
  yield takeEvery(userActionTypes.ADD_USER, addUserSaga, params.socket);
  yield takeEvery(userActionTypes.OPEN_CHANNEL, openChannelSaga, params.socket);
  yield takeEvery(
    userActionTypes.CLOSE_CHANNEL,
    closeChannelSaga,
    params.socket,
  );
}
