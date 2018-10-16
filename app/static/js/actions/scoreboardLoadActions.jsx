import {SCOREBOARD_IS_LOADING, SCOREBOARD_IS_SUCCESSED, SCOREBOARD_IS_ERRORED, SCOREBOARD_SUBSCRIBE_OR_UNSUBSCRIBE}  from './types'
import axios from 'axios'
export const scoreboardSetUpdated = data => ({
    type : SCOREBOARD_IS_SUCCESSED, 
    scoreboard: data
})
export const scoreboardSetSubscribed = (subscribed, tournament_id) =>({
    type : SCOREBOARD_SUBSCRIBE_OR_UNSUBSCRIBE,
    subscribed: subscribed,
    tournament_id: tournament_id
})
export const scoreboardSetErrored = errored => ({
    type : SCOREBOARD_IS_ERRORED, 
    scoreboardIsErrored : errored
})
export const loadScoreboardHTTP = tournament_id => dispatch => {
    axios({
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        url: 'http://localhost:8080/api/getscore?tournament_id=' + tournament_id
    }).then(response => {
        dispatch(scoreboardSetUpdated(response.data.result));
    }).catch(error=>{
        dispatch(scoreboardSetErrored(true))
    });

}