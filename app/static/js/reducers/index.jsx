import { combineReducers } from 'redux';
import userStateReducer from './userStateReducer';
import scoreboardLoadReducer from './scoreboardLoadReducer'
import registerFormSendReducer from './registerFormSendReducer'
import loginFormSendReducer from './loginFormSendReducer'
import createTeamFormReducer from './createTeamFormReducer'
import loadTeamsReducer from './teamLoadReducer'
import profileLoadReducer from './profileLoadReducer'
import tasksLoadReducer from './tasksLoadReducer'
export default combineReducers({
  userState: userStateReducer,
  scoreboardLoading: scoreboardLoadReducer,
  sendRegisterForm: registerFormSendReducer,
  sendLoginForm: loginFormSendReducer,
  createTeamForm: createTeamFormReducer, 
  profileLoad: profileLoadReducer,
  tasksLoad: tasksLoadReducer
});