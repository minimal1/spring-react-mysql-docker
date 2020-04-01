/** @format */

import React from "react";
import { withRouter, Route } from "react-router-dom";
import { notification } from "antd";

import Header from "./components/Header";
import Container from "./components/Container";
import Login from "./components/Login";
import Register from "./components/Register";
import ItemDetail from "./components/ItemDetail";

import UploadPaper from "./components/pages/UploadPaper";

import { getCurrentUser } from "./util/APIUtils";
import { ACCESS_TOKEN } from "./constants/index";
import AuthRoute from "./components/AuthRoute";
import Mypage from "./components/Mypage";
import ItemEdit from "./components/ItemEdit";
import SearchResults from "./components/pages/SearchResults";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: false,
    };

    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  loadCurrentUser() {
    this.setState({
      isLoading: true,
    });

    getCurrentUser()
      .then((response) => {
        this.setState({
          currentUser: {
            student_number: response.data.student_number,
            email: response.data.user_email,
          },
          isAuthenticated: true,
          isLoading: false,
        });
      })
      .catch((error) => {
        this.setState({
          isAuthenticated: false,
          isLoading: false,
        });
      });
  }

  componentDidMount() {
    this.loadCurrentUser();
  }

  handleLogout(
    redirectTo = "/",
    notificationType = "success",
    description = "You're successfully logged out."
  ) {
    localStorage.removeItem(ACCESS_TOKEN);
    this.setState({
      currentUser: null,
      isAuthenticated: false,
    });

    this.props.history.push(redirectTo);

    notification[notificationType]({
      message: "졸업작품ing",
      description: description,
    });
  }

  handleLogin() {
    notification.success({
      message: "졸업작품ing",
      description: "You're successfully logged in.",
    });
    this.loadCurrentUser();
    this.props.history.push("/");
  }

  render() {
    return (
      <div className='website-main'>
        <Header
          isAuthenticated={this.state.isAuthenticated}
          onLogout={this.handleLogout}
        />
        <Route exact path='/' component={Container} />
        <Route path='/result/:query' component={SearchResults} />

        <Route
          path='/login'
          render={(props) => <Login onLogin={this.handleLogin} {...props} />}
        />
        <Route path='/register' component={Register} />

        <AuthRoute
          isAuthenticated={this.state.isAuthenticated}
          path='/upload'
          render={(props) => <UploadPaper {...props} />}
        />
        <AuthRoute
          isAuthenticated={this.state.isAuthenticated}
          path='/mypage'
          render={(props) => (
            <Mypage
              loadCurrentUser={this.loadCurrentUser}
              currentUser={this.state.currentUser}
              {...props}
            />
          )}
        />

        <AuthRoute
          isAuthenticated={this.state.isAuthenticated}
          path='/detail/:itemid'
          render={(props) => <ItemDetail {...props} />}
        />
        <AuthRoute
          isAuthenticated={this.state.isAuthenticated}
          path='/editPaper/:itemid/'
          render={(props) => <ItemEdit {...props} />}
        />
      </div>
    );
  }
}

export default withRouter(App);
