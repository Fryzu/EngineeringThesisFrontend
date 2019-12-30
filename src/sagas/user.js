import { takeEvery } from 'redux-saga/effects';
import { userActionTypes } from '../actions/user';

function testSaga() {
  console.log('testSaga');
}

function addUserSaga(socket, action) {
  const { type, payload } = action;

  // console.warn(socket);
  socket.emit(type, payload, response => {
    console.warn(response);
  });
}

export default function* user(params) {
  yield takeEvery(userActionTypes.TEST_ACTION, testSaga);
  yield takeEvery(userActionTypes.ADD_USER, addUserSaga, params.socket);
}
