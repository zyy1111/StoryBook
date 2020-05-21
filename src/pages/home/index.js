import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { HomeWrapper, HomeLeft, HomeRight, BackToTop } from './style';
import Topic from './components/Topic';
import List from './components/List';
import Recommend from './components/Recommend';
import Writer from './components/Writer';
import { actionCreators } from './store';

class Home extends PureComponent {
  handleScrollTop() {
    window.scrollTo(0, 0);
  }

  bindEvents() {
    window.addEventListener('scroll', this.props.changeScrollState);
  }

  render() {
    return(
      <HomeWrapper>
        <HomeLeft>
          <img className="banner-image" alt = "" src = "https://cdn.pixabay.com/photo/2020/05/05/14/59/landscape-5133425__480.jpg"/>
          <Topic></Topic>
          <List></List>
        </HomeLeft>
        <HomeRight>
          <Recommend></Recommend>
          <Writer></Writer>
        </HomeRight>
        { this.props.showScroll ? <BackToTop onClick={this.handleScrollTop}>Back To Top</BackToTop> : null}
      </HomeWrapper>
    )
  }

  componentDidMount() {
    this.props.initHomePage();
    this.bindEvents();
  }
}

const mapStateToProps = (state) => ({
  showScroll: state.get('home').get('showScroll')
})

const mapDispatchToprops = (dispatch) => ({
  initHomePage() {
    dispatch(actionCreators.getHomeInfo());
  },
  changeScrollState() {
    if(document.documentElement.scrollTop > 100) {
      dispatch(actionCreators.changeScroll(true));
    } else {
      dispatch(actionCreators.changeScroll(false));
    }
  }
})

export default connect(mapStateToProps, mapDispatchToprops)(Home);