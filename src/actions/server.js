export const serverActionTypes = {
  SET_CHANNEL_LIST: 'setChannelList',
  SET_USER_LIST: 'setUserList',
  SEND_TO_USER: 'sendToUser',
  SEND_TO_CHANNEL: 'sendToChannel',
  GET_CHANNEL_LISTENERS: 'getChannelListeners',
  SET_CHANNEL_LISTENERS: 'settChannelListeners',
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

export const sendToChannel = (messageType, message) => ({
  type: serverActionTypes.SEND_TO_CHANNEL,
  payload: { messageType, message },
});

export const getChannelListeners = channelName => ({
  type: serverActionTypes.GET_CHANNEL_LISTENERS,
  payload: { channelName },
});

export const setChannelListeners = listeners => ({
  type: serverActionTypes.SET_CHANNEL_LISTENERS,
  payload: { listeners },
});
