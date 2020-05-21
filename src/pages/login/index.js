import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { LoginWrapper, LoginBox, Input, Button } from './style';
import { actionCreators } from './store';

class Login extends PureComponent {
  render() {
    const { login } = this.props;
    if(!login) {
      return (
        <LoginWrapper>
          <LoginBox>
            <Input placeholder="username" ref={(input) => {this.username = input}}></Input>
            <Input placeholder="password" type="password" ref={(input) => {this.password = input}}></Input>
            <Button onClick={() => this.props.handleLogin(this.username, this.password)}>Login</Button>
          </LoginBox>
        </LoginWrapper>
      )
    } else {
      return <Redirect to='/' />
    }
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.get('login').get('isLogin')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleLogin(username, password) {
      dispatch(actionCreators.getLogin(username.value, password.value));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);