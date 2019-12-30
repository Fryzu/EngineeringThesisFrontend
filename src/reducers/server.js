import { serverActionTypes } from '../actions/server';

const initialState = {
  channels: [],
  users: [],
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case serverActionTypes.SET_CHANNEL_LIST: {
      const { channels } = action.payload;
      return {
        ...state,
        channels,
      };
    }
    case serverActionTypes.SET_USER_LIST: {
      const { users } = action.payload;
      return {
        ...state,
        users,
      };
    }
    default: {
      return state;
    }
  }
}
