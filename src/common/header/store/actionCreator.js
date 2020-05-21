import {actionTypes} from './';
import axios from 'axios';
import { fromJS } from 'immutable';

function changeList(data) {
  return {
    type: actionTypes.CHANGE_LIST,
    data: fromJS(data),
    totalPage: Math.ceil(data.length / 10)
  }
}

export const searchFocus = () => {
  return {
    type: actionTypes.SEARCH_FOCUS
  }
};

export function searchBlur() {
  return {
    type: actionTypes.SEARCH_BLUR
  }
}

export function showSerchList() {
  return (dispatch) => {
    axios.get('/api/headerList.json').then((res) => {
      const data = res.data;
      dispatch(changeList(data.data));
    }).catch((err) => {
      console.log(err);
    })
  }
}

export const MouseEnter = () => {
  return {
    type: actionTypes.MOUSE_ENTER
  }
}

export const MouseLeave = () => {
  return {
    type: actionTypes.MOUSE_LEAVE
  }
}

export const ChangePage = (page) => {
  return {
    type: actionTypes.CHANGE_PAGE,
    page
  }
}
