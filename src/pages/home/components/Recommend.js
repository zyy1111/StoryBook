import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { RecommendWrapper, RecommendItem } from '../style';

class Recommend extends PureComponent {
  render() {
    const { recommendList } = this.props;
    return (
      <RecommendWrapper>
        {
          recommendList.map((item) => {
            return <RecommendItem imgURL={item.get('imgURL')} key={item.get('id')}></RecommendItem>
          })
        }  
      </RecommendWrapper>
    )
  }
}

function mapStateToProps(store) {
  return {
    recommendList: store.get('home').get('recommendList')
  }
}

export default connect(mapStateToProps, null)(Recommend);