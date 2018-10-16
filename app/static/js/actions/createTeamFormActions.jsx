import {CREATE_TEAM_FORM_ERRORED, CREATE_TEAM_FORM_SENDING, CREATE_TEAM_FORM_VALIDATION_FAILED, CREATE_TEAM_FORM_SUCCESSED} from './types'
import axios from 'axios'

export const sendCreateTeamForm = (name, city) => dispatch =>
{
    axios({
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        method: 'POST',
        url: 'http://localhost:8080/api/team/create',
        data: {
            'name':    name,
            'city':    city,
        }
    }).then((response)=>{
            if(response.data.status === "ok")
            {
                dispatch({type: CREATE_TEAM_FORM_SUCCESSED});
            }
            else
            {
                dispatch({type: CREATE_TEAM_FORM_VALIDATION_FAILED, validationError: response.data.result})
            }
        },
        (err)=>{
            dispatch({type: CREATE_TEAM_FORM_ERRORED});
        });
}