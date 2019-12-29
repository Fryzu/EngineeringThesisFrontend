export const userActionTypes = {
  TEST_ACTION: 'TEST_ACTION',
};

export const testAction = testData => ({
  type: userActionTypes.TEST_ACTION,
  payload: { testData },
});
