import {LOGIN_FORM_ERRORED, LOGIN_FORM_SUCCESSED, LOGIN_FORM_VALIDATION_FAILED} from '../actions/types'


export default function(state = {successed: false, errored: false, invalid: false, validationError:''}, action)
{
  switch (action.type) {
        case LOGIN_FORM_SUCCESSED:
            return {
              successed: true,
              errored: false,
              invalid: false
            }
        case LOGIN_FORM_ERRORED:
            return {
                errored: true,
                succesed: false,
                invalid: false
            }
        case LOGIN_FORM_VALIDATION_FAILED:
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
