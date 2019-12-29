import { takeEvery } from 'redux-saga/effects';
import { userActionTypes } from '../actions/user';

export function* userHandle() {
  console.warn('dupa');
  yield 'dupa';
}

export default function* user() {
  yield takeEvery(userActionTypes.TEST_ACTION, userHandle);
}
