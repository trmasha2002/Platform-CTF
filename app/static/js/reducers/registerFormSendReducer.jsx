import {REGISTER_FORM_ERRORED, REGISTER_FORM_SUCCESSED, REGISTER_FORM_VALIDATION_FAILED} from '../actions/types'


export default function(state = {successed: false, errored: false, invalid: false, validationError:''}, action)
{
  switch (action.type) {
        case REGISTER_FORM_SUCCESSED:
            return {
              successed: true,
              errored: false,
              invalid: false
            }
        case REGISTER_FORM_ERRORED:
            return {
                errored: true,
                succesed: false,
                invalid: false
            }
        case REGISTER_FORM_VALIDATION_FAILED:
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
