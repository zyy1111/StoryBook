import { fromJS } from 'immutable';
import { actionTypes } from './';

const defaultState = fromJS({
  title: '',
  content: ''
})

export default (state=defaultState, action) => {
  if(action.type === actionTypes.LOAD_DETAIL) {
    return state.merge({
      title: action.title,
      content: action.content
    })
  }
  return state;
}