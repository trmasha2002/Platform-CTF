import {SCOREBOARD_IS_SUCCESSED, SCOREBOARD_IS_LOADING, SCOREBOARD_IS_ERRORED, SCOREBOARD_SUBSCRIBE_OR_UNSUBSCRIBE} from '../actions/types';


export default function(state = {scoreboardIsLoading: true, scoreboardIsErrored: false, scoreboard: {}, subscribed: false, tournament_id: null}, action)
{
  switch (action.type) {
        case SCOREBOARD_IS_ERRORED:
            return {
                scoreboardIsErrored: action.scoreboardIsErrored
            }
        case SCOREBOARD_IS_SUCCESSED:
            return {
                scoreboard: action.scoreboard,
                scoreboardIsLoading: false,
                scoreboardIsErrored: false, 
                tournament_id: state.tournament_id,
                subscribed: state.subscribed
            }
        case SCOREBOARD_SUBSCRIBE_OR_UNSUBSCRIBE:
           return {
               subscribed: action.subscribed,
               scoreboard: state.scoreboard, // Не делайте так. Это опасно для моска
               tournament_id: action.tournament_id,
               scoreboardIsLoading: state.scoreboardIsLoading,
               scoreboardIsErrored: state.scoreboardIsErrored
           }
      default:
          return state;
  }
}