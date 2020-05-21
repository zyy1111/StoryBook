import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { TopicWrapper, TopicItem } from '../style';

class Topic extends PureComponent {
  render() {
    const { topicList } = this.props;
    return (
      <TopicWrapper>
        {topicList.map((item) => {
          return (
            <TopicItem key = {item.get('id')}>
              <img className="topic-pic" alt="" src = {item.get('imgURL')} />
                {item.get('title')}
            </TopicItem>
          )
        })}
      </TopicWrapper>
    )
  }
}

function mapStateToProps(store) {
  return {
    topicList: store.get('home').get('topicList')
  }
}


export default connect(mapStateToProps, null)(Topic);