import { userActionTypes } from '../actions/user';

const initialState = {
  testData: false,
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case userActionTypes.TEST_ACTION: {
      const { testData } = action.payload;
      return {
        ...state,
        testData,
      };
    }
    default: {
      return state;
    }
  }
}
