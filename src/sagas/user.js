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

  // console.warn(socket);
  const { channels, users } = yield call(
    socketConnection,
    socket,
    type,
    payload,
  );

  yield put(setChannelList(channels));
  yield put(setUserList(users));
}

export default function* user(params) {
  yield takeEvery(userActionTypes.TEST_ACTION, testSaga);
  yield takeEvery(userActionTypes.ADD_USER, addUserSaga, params.socket);
}
