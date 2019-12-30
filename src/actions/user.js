export const userActionTypes = {
  TEST_ACTION: 'testAction',
  ADD_USER: 'addUser',
};

export const testAction = testData => ({
  type: userActionTypes.TEST_ACTION,
  payload: { testData },
});

export const addUser = userName => ({
  type: userActionTypes.ADD_USER,
  payload: { userName },
});
