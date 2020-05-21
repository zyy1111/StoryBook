import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { WriterWrapper, Title, WriterItem, ChangeWriters } from '../style';

class Writer extends PureComponent {
  render() {
    return (
      <WriterWrapper>
        <Title>
          <div className="writer">Popular Writer</div>
          <ChangeWriters>
            <i className = 'iconfont'>&#xe851;</i>
            Change
          </ChangeWriters>
        </Title>
        {this.props.writeList.map((item) => {
          return (
            <WriterItem>
              <img className="writer-pic" alt="" src={item.get('photo')}/>
              <p className="writer"> {item.get('username')} </p>
           </WriterItem>
          )
        })}

       
      </WriterWrapper>
    )
  }
}

const mapPropsToState = (state) => {
  return {
    writeList: state.get('home').get('writerList')
  }
}

  
export default connect(mapPropsToState)(Writer);