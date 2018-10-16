import {LOGIN_FORM_ERRORED, LOGIN_FORM_SENDING, LOGIN_FORM_VALIDATION_FAILED, LOGIN_FORM_SUCCESSED} from './types'
import axios from 'axios'

export const sendLoginForm = (login, password) => dispatch =>
{
    axios({
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        method: 'POST',
        url: 'http://localhost:8080/api/login',
        data: {
            'login':       login,
            'password':    password,
        }
    }).then((response)=>{
            if(response.data.status === "ok")
            {
                dispatch({type: LOGIN_FORM_SUCCESSED});
            }
            else
            {
                dispatch({type: LOGIN_FORM_VALIDATION_FAILED, validationError: response.data.result})
            }
        },
        (err)=>{
            dispatch({type: LOGIN_FORM_ERRORED});
        });
}