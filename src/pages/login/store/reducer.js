import { fromJS } from 'immutable';
import { actionTypes } from '.';

const defaultState = fromJS({
  isLogin: false
})

export default (state=defaultState, action) => {
  if(action.type === actionTypes.CHANGE_LOGINSTATUS) {
    return state.set('isLogin', action.result);
  }

  if(action.type === actionTypes.LOG_OUT) {
    return state.set('isLogin', action.value);
  }

  return state;
}