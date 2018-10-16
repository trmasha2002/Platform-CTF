import {TEAMS_IS_LOADING, TEAMS_IS_SUCCESSED, TEAMS_IS_ERRORED} from './types'
import axios from 'axios'
const teamSetIsLoading = loaded => ({
    type : TEAMS_IS_LOADING, 
    IsLoading : loaded
})
export const loadScoreboard = () => dispatch =>
{
    dispatch(teamSetIsLoading(true));
    axios({
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            url: 'http://localhost:8080/api/teams/all'
        }).then(response => {
            dispatch({
                type: TEAMS_IS_SUCCESSED,
                data: response.data.result
            });
        }).catch(error=>{
            dispatch({
                type: TEAMS_IS_ERRORED,
                isErrored: true
            })
        });

}