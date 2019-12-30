export const serverActionTypes = {
  SET_CHANNEL_LIST: 'setChannelList',
  SET_USER_LIST: 'setUserList',
};

export const setChannelList = channels => ({
  type: serverActionTypes.SET_CHANNEL_LIST,
  payload: { channels },
});

export const setUserList = users => ({
  type: serverActionTypes.SET_USER_LIST,
  payload: { users },
});
