import React, {PureComponent, Fragment} from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route} from 'react-router-dom';
import { Globalstyle } from './style';
import { IconGlobalStyle }  from './static/icon/iconfont';
import Header from './common/header';
import store from './store';
import Home from './pages/home';
import Detail from './pages/detail/loadable.js';
import Login from './pages/login'

class App extends PureComponent {
  render() {
    return (
      <Fragment>
        <Globalstyle />
        <IconGlobalStyle />
        <Provider store = {store}>
            <BrowserRouter>
              <Header />
              <div>
                <Route path='/' exact component={Home}></Route>
                <Route path='/detail/:id' exact component={Detail}></Route>
                <Route path='/login' exact component={Login}></Route>
              </div>
            </BrowserRouter>
        </Provider>
      </Fragment>
    )
  }
}

export default App;
