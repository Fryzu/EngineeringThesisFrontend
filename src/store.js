import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import sagas from './sagas';
import createSocketConnection from './api/sockets';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware, logger),
);

const socket = createSocketConnection(store);

sagaMiddleware.run(sagas, { socket });
