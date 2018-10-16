import {TEAMS_IS_SUCCESSED, TEAMS_IS_LOADING, TEAMS_IS_ERRORED} from '../actions/types';


export default function(state = {isLoading: true, isErrored: false, data: {}}, action)
{
  switch (action.type) {
        case TEAMS_IS_LOADING:
            return {
              isLoading : action.isLoading
            }
        case TEAMS_IS_ERRORED:
            return {
                isErrored: action.isErrored
            }
        case TEAMS_IS_SUCCESSED:
            return {
                data: action.data
            }
      default:
          return state;
  }
}