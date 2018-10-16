import {PROFILE_IS_SUCCESSED, PROFILE_IS_LOADING, PROFILE_IS_ERRORED} from '../actions/types';


export default function(state = {isLoading: true, isErrored: false, data: {}}, action)
{
  switch (action.type) {
        case PROFILE_IS_LOADING:
            return {
              isLoading : action.isLoading
            }
        case PROFILE_IS_ERRORED:
            return {
                isErrored: action.isErrored
            }
        case PROFILE_IS_SUCCESSED:
            return {
                data: action.data,
                isLoading: false
            }
      default:
          return state;
  }
}