export const userActionTypes = {
  TEST_ACTION: 'testAction',
  ADD_USER: 'addUser',
  OPEN_CHANNEL: 'openChannel',
  CLOSE_CHANNEL: 'closeChannel',
  ADD_ME_TO_CHANNEL: 'addMeToChannel',
};

export const testAction = testData => ({
  type: userActionTypes.TEST_ACTION,
  payload: { testData },
});

export const addUser = userName => ({
  type: userActionTypes.ADD_USER,
  payload: { userName },
});

export const openChannel = channelName => ({
  type: userActionTypes.OPEN_CHANNEL,
  payload: { channelName },
});

export const closeChannel = () => ({
  type: userActionTypes.CLOSE_CHANNEL,
});

export const addMeToChannel = channelName => ({
  type: userActionTypes.ADD_ME_TO_CHANNEL,
  payload: { channelName },
});
