import {REGISTER_FORM_ERRORED, REGISTER_FORM_SENDING, REGISTER_FORM_VALIDATION_FAILED, REGISTER_FORM_SUCCESSED} from './types'
import axios from 'axios'

export const sendRegisterForm = (name, mail, login, password, confirmpass) => dispatch =>
{
    axios({
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        method: 'POST',
        url: 'http://localhost:8080/api/register',
        data: {
            'name':        name,
            'email':       mail,
            'login':       login,
            'password':    password,
            'confirmpass': confirmpass,
        }
    }).then((response)=>{
            if(response.data.status === "ok")
            {
                dispatch({type: REGISTER_FORM_SUCCESSED});
            }
            else
            {
                dispatch({type: REGISTER_FORM_VALIDATION_FAILED, validationError: response.data.result})
            }
        },
        (err)=>{
            dispatch({type: REGISTER_FORM_ERRORED});
        });
}