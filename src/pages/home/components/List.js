import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { ListItem, ListInfo, LoadMore} from '../style';
import { actionCreators } from '../store';
import { Link } from 'react-router-dom';

class List extends PureComponent {
  render() {
    const { articleList, handleLoadMore, curPage } = this.props;
    return (
      <div>
        {
          articleList.map((item, index) => {
            return (
              <Link key={index} to={'/detail/' + item.get('id')}>
                <ListItem >
                  <img alt="" className="list-pic" src={item.get('imgURL')} ></img>
                  <ListInfo>
                    <h3 className="title">{item.get('title')}</h3>
                    <p className="desc">{item.get('content')}</p>
                  </ListInfo>
                </ListItem>
              </Link>
            )
          })
        }
        <LoadMore onClick={() => handleLoadMore(curPage)}>Find more interesting stuff...</LoadMore>
      </div>
    )
  }
}

function mapStateToProps(store) {
  return {
    articleList: store.get('home').get('articleList'),
    curPage: store.get('home').get('curPage')
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleLoadMore(curPage) {
      dispatch(actionCreators.LoadMoreHomeList(curPage));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);