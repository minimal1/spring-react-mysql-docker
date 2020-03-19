/** @format */

import React from 'react';
import { withRouter, Route } from 'react-router-dom';
import { notification } from 'antd';

import Header from './components/Header';
import Container from './components/Container';
import Upload from './components/UploadPaper';
import Login from './components/Login';
import Register from './components/Register';
import ItemDetail from './components/ItemDetail';

import './App.css';
import UploadPaper from './components/UploadPaper';

import { getCurrentUser } from './util/APIUtils';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: false
    };

    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }
  loadCurrentUser() {
    this.setState({
      isLoading: true
    });

    getCurrentUser()
      .then(response => {
        this.setState({
          currentUser: response,
          isAuthenticated: true,
          isLoading: false
        });
      })
      .catch(error => {
        this.setState({
          isLoading: false
        });
      });
  }

  componentDidMount() {
    this.loadCurrentUser();
  }

  handleLogin() {
    notification.success({
      message: '졸업작품ing',
      description: "You're successfully logged in."
    });
    this.loadCurrentUser();
    this.props.history.push('/');
  }

  render() {
    return (
      <div className='website-main'>
        <Header />
        <Route exact path='/' component={Container} />
        <Route path='/upload' component={UploadPaper} />
        <Route
          path='/login'
          render={props => <Login onLogin={this.handleLogin} {...props} />}
        />
        <Route path='/register' component={Register} />
        <Route path='/detail/:itemid' component={ItemDetail} />
      </div>
    );
  }
}

export default withRouter(App);
