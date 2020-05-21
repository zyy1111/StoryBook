import Axios from "axios"
import { actionTypes } from './';
import { fromJS } from 'immutable';

const initalHomeInfo = (result) => {
  return {
    type: actionTypes.CHANGE_HOME,
    topicList: result.topicList,
    articleList: result.articleList,
    recommendList: result.recommendList,
    writerList: result.writerList
  }
}

export const AddMoreList = (list, nextPage) => {
  return {
    type: actionTypes.LOAD_MORE,
    list: fromJS(list),
    curPage: nextPage
  }
}

export const getHomeInfo = () => {
  return (dispatch) => {
    Axios.get('/api/home.json').then((res) => {
      const result = res.data.data;
      dispatch(initalHomeInfo(result));
    }).catch((err) => {
      console.log(err);
    })
  }
}

export const LoadMoreHomeList = (curPage) => {
  return (dispatch) => {
    Axios.get('/api/moreHomeList.json?page=' + curPage).then((res) => {
      const result = res.data.data;
      dispatch(AddMoreList(result, curPage + 1));
    }).catch((err) => {
      console.log(err);
    })
  }
}

export const changeScroll = (flag) => {
  return {
    type: actionTypes.CHANGE_SCROLL,
    flag
  }
}