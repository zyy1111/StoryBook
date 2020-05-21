import { fromJS } from 'immutable';
import { actionTypes } from './';

const defaultState = fromJS({
  topicList: [],
  articleList: [],
  recommendList: [],
  writerList: [],
  curPage: 1,
  showScroll: false
})

export default (state = defaultState, action) => {
  if(action.type === actionTypes.CHANGE_HOME) {
    return state.merge({
      topicList: fromJS(action.topicList),
      articleList: fromJS(action.articleList),
      recommendList: fromJS(action.recommendList),
      writerList: fromJS(action.writerList)
    })
  }

  if(action.type === actionTypes.LOAD_MORE) {
    return state.merge({
      articleList: state.get('articleList').concat(action.list),
      curPage: action.curPage
    })
  }

  if(action.type === actionTypes.CHANGE_SCROLL) {
    return state.set('showScroll', action.flag);
  }

  return state;
}