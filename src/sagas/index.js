import { fork } from 'redux-saga/effects';
import user from './user';

export default function* rootSaga(params) {
  yield fork(user, params);
}
