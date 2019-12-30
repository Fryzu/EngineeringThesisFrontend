export const serverActionTypes = {
  SET_CHANNEL_LIST: 'setChannelList',
  SET_USER_LIST: 'setUserList',
  SEND_TO_USER: 'sendToUser',
};

export const setChannelList = channels => ({
  type: serverActionTypes.SET_CHANNEL_LIST,
  payload: { channels },
});

export const setUserList = users => ({
  type: serverActionTypes.SET_USER_LIST,
  payload: { users },
});

export const sendToUser = (userName, messageType, message) => ({
  type: serverActionTypes.SEND_TO_USER,
  payload: { userName, messageType, message },
});
