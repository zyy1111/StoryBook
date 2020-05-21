import React, { PureComponent } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { DetailWrapper, Header, Content } from './style';
import { actionCreators } from "./store";

class Detail extends PureComponent {

  render() {
    return(
      <DetailWrapper>
        <Header>{this.props.title}</Header>
        <Content dangerouslySetInnerHTML={{__html: this.props.content}} />
      </DetailWrapper>
    )
  }

  
  componentDidMount() {
    this.props.loadDetail(this.props.match.params.id);
  }
}

const mapStateToProps = (state) => {
  return {
    title: state.get('detail').get('title'),
    content: state.get('detail').get('content')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadDetail(id) {
      dispatch(actionCreators.getDetail(id));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Detail));