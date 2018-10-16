import {CREATE_TEAM_FORM_ERRORED, CREATE_TEAM_FORM_SUCCESSED, CREATE_TEAM_FORM_VALIDATION_FAILED} from '../actions/types'


export default function(state = {successed: false, errored: false, invalid: false, validationError:''}, action)
{
  switch (action.type) {
        case CREATE_TEAM_FORM_SUCCESSED:
            return {
              successed: true,
              errored: false,
              invalid: false
            }
        case CREATE_TEAM_FORM_ERRORED:
            return {
                errored: true,
                succesed: false,
                invalid: false
            }
        case CREATE_TEAM_FORM_VALIDATION_FAILED:
            return {
                invalid: true,
                succesed: false,
                errored: false,
                validationError: action.validationError
            }
      default:
          return state;
        }
  }
