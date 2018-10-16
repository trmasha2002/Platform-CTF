import { USER_STATE } from './types';
import axios from "axios";

export const userState = () => dispatch => {
    axios.defaults.withCredentials = true;
    axios({
        url : "http://localhost:8080/api/user/is_auth",
        headers: {
                'Access-Control-Allow-Origin': '*'
            },

        method: 'POST',
    })
        .then(function (response)
        {
            dispatch({
                type: USER_STATE,
                payload: response.data.result,
            });
        })
};