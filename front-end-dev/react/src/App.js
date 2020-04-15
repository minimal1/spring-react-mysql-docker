/** @format */

import React from "react";
import { withRouter, Route } from "react-router-dom";
import { notification } from "antd";

import Header from "./components/partials/Header";
import Footer from "./components/partials/Footer";

import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import UploadPaper from "./components/pages/UploadPaper";
import Mypage from "./components/pages/Mypage";
import ItemDetail from "./components/pages/ItemDetail";
import ItemEdit from "./components/pages/ItemEdit";
import ChangePassword from "./components/pages/changePassword";

import AuthRoute from "./components/AuthRoute";
import Container from "./components/Container";

import { getCurrentUser } from "./util/APIUtils";
import { ACCESS_TOKEN } from "./constants/index";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: false,
      query: "",
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

    window.location.reload(false);
  }

  handleLogin() {
    notification.success({
      message: "졸업작품ing",
      description: "You're successfully logged in.",
    });
    this.loadCurrentUser();
    this.props.history.push("/");
  }

  handleSearch = (query) => {
    this.setState({ query });
  };

  render() {
    return (
      <div className='website-main'>
        <Header
          isAuthenticated={this.state.isAuthenticated}
          onLogout={this.handleLogout}
          onSearch={this.handleSearch}
          query={this.state.query}
        />
        <Route
          exact
          path='/'
          render={(props) => (
            <Container
              query={this.state.query}
              onSearch={this.handleSearch}
              isAuthenticated={this.state.isAuthenticated}
              {...props}
            />
          )}
        />
        {/* <Route path='/result/:query' component={SearchResults} /> */}

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
          render={(props) => <Mypage {...props} />}
        />
        <AuthRoute
          isAuthenticated={this.state.isAuthenticated}
          path='/changePassword'
          render={(props) => (
            <ChangePassword
              loadCurrentUser={this.loadCurrentUser}
              currentUser={this.state.currentUser}
              {...props}
            />
          )}
        />

        <AuthRoute
          isAuthenticated={this.state.isAuthenticated}
          path='/detail/:itemid'
          render={(props) => (
            <ItemDetail currentUser={this.state.currentUser} {...props} />
          )}
        />
        <AuthRoute
          isAuthenticated={this.state.isAuthenticated}
          path='/editPaper/:itemid/'
          render={(props) => <ItemEdit {...props} />}
        />
        <Footer />
      </div>
    );
  }
}

export default withRouter(App);
