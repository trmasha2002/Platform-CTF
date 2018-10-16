import {PROFILE_IS_LOADING, PROFILE_IS_SUCCESSED, PROFILE_IS_ERRORED} from './types'
import axios from 'axios'
const teamSetIsLoading = loaded => ({
    type : PROFILE_IS_LOADING, 
    isLoading : loaded
})
export const loadProfile = (id) => dispatch =>
{
    dispatch(teamSetIsLoading(true));
    axios({
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            url: 'http://localhost:8080/api/user/'+id
        }).then(response => {
        console.log(response.data.result);
            dispatch({
                type: PROFILE_IS_SUCCESSED,
                data: response.data.result
            });
        }).catch(error=>{
            dispatch({
                type: PROFILE_IS_ERRORED,
                isErrored: true
            })
        })

}