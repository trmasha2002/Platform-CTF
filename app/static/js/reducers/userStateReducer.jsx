import { USER_STATE } from '../actions/types';

const initialState = {
  status: {id: null, username: null, loading: null}
};

export default function(state = initialState, action)
{
  switch (action.type) {
      case USER_STATE:
          return {
              status: action.payload,
          };

      default:
          return state;
  }
}