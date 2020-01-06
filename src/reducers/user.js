import { userActionTypes } from '../actions/user';

const initialState = {
  testData: null,
  userName: null,
  channelName: null,
  channelOwner: null,
  remoteSDP: null,
  ICECandidates: [],
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
    case userActionTypes.OPEN_CHANNEL: {
      const { channelName } = action.payload;
      const { userName } = state;

      return {
        ...state,
        channelName,
        channelOwner: userName,
      };
    }
    case userActionTypes.CLOSE_CHANNEL: {
      return {
        ...state,
        channelName: null,
        channelOwner: null,
      };
    }
    case userActionTypes.ADD_ME_TO_CHANNEL: {
      const { channelName } = action.payload;

      return {
        ...state,
        channelName,
      };
    }
    case userActionTypes.SET_REMOTE_SDP: {
      const { sdpOffer } = action.payload;

      return {
        ...state,
        remoteSDP: sdpOffer,
      };
    }
    case userActionTypes.ADD_ICE_CANDIDATE: {
      const { candidate } = action.payload;
      const { ICECandidates } = state;

      return {
        ...state,
        ICECandidates: [...ICECandidates, candidate],
      };
    }
    case userActionTypes.SET_CHANNEL_AUTHOR: {
      const { author } = action.payload;

      return {
        ...state,
        channelOwner: author,
      };
    }
    default: {
      return state;
    }
  }
}
