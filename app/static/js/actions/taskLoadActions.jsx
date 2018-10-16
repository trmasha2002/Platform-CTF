import {TASKS_IS_LOADING, TASKS_IS_SUCCESSED, TASKS_IS_ERRORED, TASK_IS_SOLVED} from './types'
import axios from 'axios'
const tasksSetIsLoading = loaded => ({
    type : TASKS_IS_LOADING, 
    isLoading : loaded
})
export const setTaskRight = (task_id) => ({
    type: TASK_IS_SOLVED,
    task_id: task_id
})
export const loadTasks = (id) => dispatch =>
{
    dispatch(tasksSetIsLoading(true));
    axios.defaults.withCredentials = true;
    axios({
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            url: 'http://localhost:8080/api/gettasks?tournament_id=' + id
        }).then(response => {
            dispatch({
                type: TASKS_IS_SUCCESSED,
                data: response.data.result.tasks,
                solved: response.data.result.solved
            });
        }).catch(error=>{
            dispatch({
                type: TASKS_IS_ERRORED,
                isErrored: true
            })
        });

}