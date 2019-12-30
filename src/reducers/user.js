import { userActionTypes } from '../actions/user';

const initialState = {
  testData: null,
  userName: null,
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
    case userActionTypes.ADD_USER: {
      const { userName } = action.payload;
      return {
        ...state,
        userName,
      };
    }
    default: {
      return state;
    }
  }
}
