import Axios from "axios"
import { actionTypes } from './';

const login = (result) => {
  return {
    type: actionTypes.CHANGE_LOGINSTATUS,
    result
  }
}

export const logout = () => {
  return {
    type: actionTypes.LOG_OUT,
    value: false
  }
}

export const getLogin = (username, password) => {
  return (dispatch) => {
    Axios.get('/api/login.json?account=' + username + '&password=' + password).then((res) => {
      const result = res.data.data;
      dispatch(login(result));
    }).catch((err) => {
      console.log(err);
    })
  }
}