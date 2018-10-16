import {TASKS_IS_SUCCESSED, TASKS_IS_LOADING, TASKS_IS_ERRORED, TASK_IS_SOLVED} from '../actions/types';


export default function(state = {isLoading: true, isErrored: false, data: {}, solved:[]}, action)
{
  switch (action.type) {
        case TASKS_IS_LOADING:
            return {
              isLoading : action.isLoading,
              solved: []
            }
        case TASKS_IS_ERRORED:
            return {
                isErrored: action.isErrored,
                solved: []
            }
        case TASKS_IS_SUCCESSED:
            return {
                data: action.data,
                isLoading: false,
                solved: action.solved
            }
        case TASK_IS_SOLVED:
            let solved =( state.solved.slice())
            solved.push((action.task_id) * 1)
            return {
                isLoading: false,
                data: state.data, // Не делайте так!!!
                solved: solved
            }
      default:
          return state;
  }
}