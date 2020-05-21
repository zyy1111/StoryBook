import React, { PureComponent } from 'react';
import {connect} from 'react-redux';
import {CSSTransition} from 'react-transition-group';
import {SearchList, SearchItem, SearchInfoSwitch, SearchInfoTitle, SearchInfo, HeaderWrapper, Logo, Nav, NavItem, NavSearch, Addition, Button, SearchWrapper} from './style.js';
import { actionCreators } from './store';
import { actionCreators as loginActionCreators} from '../../pages/login/store'
import { Link } from 'react-router-dom';

class Header extends PureComponent {
  render() {
    const { focused, handleFocus, handleBlur, list, islogin, logout } = this.props;
    return (
      <HeaderWrapper>
        <Link to='/'>
          <Logo></Logo>
        </Link>
        
        <Nav>
          <NavItem className = 'left active'>HomePage</NavItem>
          <NavItem className = 'left'>Download App</NavItem>
          { islogin ? <NavItem className='right' onClick={logout}>Exit</NavItem> : <Link to='/login'><NavItem className = 'right'>Login</NavItem></Link> }
          <NavItem className = 'right'>
            <i className = 'iconfont'>&#xe636;</i>
          </NavItem>
          <SearchWrapper>
            <CSSTransition in = {focused} timeout = {200} classNames = "slide">
              <NavSearch 
                placeholder = "Search" 
                className = {focused ? 'focused' : ''}
                onFocus = {() => handleFocus(list)}
                onBlur = {handleBlur}>
              </NavSearch>
            </CSSTransition>
            <i className = {focused ? 'focused iconfont zoom' : 'iconfont zoom'} >&#xe63c;</i>
            {this.getListArea(focused)}
          </SearchWrapper>
        </Nav>
        <Addition>
          <Button className = 'reg'>Sign In</Button>
          <Button className = 'writing'>
            <i className = 'iconfont'>&#xe678;</i>
            Write Blogs
          </Button>
        </Addition>
      </HeaderWrapper>
    )
  }

  getListArea() {
    const { list, focused, page, totalPage, mouseIn, handleMouseEnter, handleMouseLeave, handleChangePage} = this.props;
    const newList = list.toJS();
    const pageList = [];

    if(newList.length) {  //Ajax请求之后List才有值
      for(let i = (page-1)*10; i < page * 10; i++) {
        pageList.push(<SearchItem key = {newList[i]}>{newList[i]}</SearchItem>)
      }
    }
    
    if(focused || mouseIn) {
      return (
        <SearchInfo onMouseEnter = {handleMouseEnter} onMouseLeave = {handleMouseLeave}>
          <SearchInfoTitle>Hot
            <SearchInfoSwitch onClick = {() => handleChangePage(page, totalPage, this.spinIcon)}>
            <i ref = {(icon) => {this.spinIcon = icon}} className = 'iconfont spin'>&#xe851;</i>
              Change
            </SearchInfoSwitch>
          </SearchInfoTitle>
          <SearchList> {pageList} </SearchList>
        </SearchInfo>
      )
    } else {
      return null;
    }
  }
}

function mapStateToProps(state) {
  return {
    focused: state.get('header').get('focused'),
    list: state.get('header').get('list'),
    page: state.get('header').get('page'),
    totalPage: state.get('header').get('totalPage'),
    mouseIn: state.get('header').get('mouseIn'),
    islogin: state.get('login').get('isLogin')
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleFocus(list) {
      if(list.size === 0) dispatch(actionCreators.showSerchList());
      dispatch(actionCreators.searchFocus());
    },

    handleBlur() {
      dispatch(actionCreators.searchBlur());
    },

    handleMouseEnter() {
      dispatch(actionCreators.MouseEnter());
    },

    handleMouseLeave() {
      dispatch(actionCreators.MouseLeave());
    },
    
    handleChangePage(page, totalPage, spin) {
      let originAngle  = spin.style.transform.replace(/[^0-9]/ig, '');
      if (originAngle) {
        originAngle = parseInt(originAngle, 10);
      } else {
        originAngle = 0;
      }
      spin.style.transform = 'rotate(' + (originAngle + 360) + 'deg)';

      if(page < totalPage) {
        dispatch(actionCreators.ChangePage(page + 1));
      } else {
        dispatch(actionCreators.ChangePage(1));
      }
    },

    logout() {
      dispatch(loginActionCreators.logout());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);