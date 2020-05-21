import Axios from "axios";
import { actionTypes } from ".";

const loadDetail = (title, content) => {
  return {
    type: actionTypes.LOAD_DETAIL,
    title,
    content
  }
}

export const getDetail = (id) => {
  return (dispatch) => {
    Axios.get('/api/detail.json?id=' + id).then((res) => {
      const result = res.data.data;
      dispatch(loadDetail(result.title, result.content));
    }).catch((err) => {
      console.log(err);
    })
  }
}