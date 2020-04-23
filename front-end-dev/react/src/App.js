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
import ChangePassword from "./components/pages/ChangePassword";
import Admin from "./components/pages/Admin";

import AuthRoute from "./components/AuthRoute";
import Container from "./components/Container";

import { getCurrentUser } from "./util/APIUtils";
import { ACCESS_TOKEN } from "./constants/index";
import Filter from "./components/partials/Filter";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: false,
      keyword: "",
      year: "",
      professor: "",
      category: "",
      hashtag: "",

      filter: false,
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

  handleSearch = (keyword) => {
    this.setState({
      keyword,
    });
  };

  handleFilters = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  toggleFilter = () => {
    const { filter } = this.state;
    if (filter) {
      // not use
      this.setState({
        year: "",
        professor: "",
        category: "",
        hashtag: "",
        filter: false,
      });
    } else {
      this.setState({
        filter: true,
      });
    }
  };

  render() {
    const { keyword, year, professor, category, hashtag } = this.state;
    const query = { keyword, year, professor, category, hashtag };

    return (
      <div className='website-main'>
        <Header
          isAuthenticated={this.state.isAuthenticated}
          currentUser={this.state.currentUser}
          onLogout={this.handleLogout}
          onSearch={this.handleSearch}
          keyword={keyword}
          toggleFilter={this.toggleFilter}
        />
        <Filter
          doFilterUse={this.state.filter}
          filterData={{ year, professor, category }}
          onChangeFilters={this.handleFilters}
        />
        <Route
          exact
          path='/'
          render={(props) => (
            <Container
              query={query}
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
        <Route path='/admin' render={(props) => <Admin {...props} />} />
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
