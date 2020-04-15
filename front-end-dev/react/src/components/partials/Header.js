/** @format */

import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Input } from "antd";

const { Search } = Input;

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
    };
  }

  componentDidUpdate(prevProps, prevState, snapshots) {
    if (prevProps.query !== this.props.query) {
      const query = this.props.query;
      this.setState({ query });
    }
  }

  handleChange = (e) => {
    const {
      target: { value },
    } = e;

    this.setState({
      query: value,
    });
  };

  handleLogout = (e) => {
    this.props.onLogout();
  };

  handleSubmit = (e) => {
    this.props.onSearch(this.state.query);
  };

  render() {
    const isAuthenticated = this.props.isAuthenticated;

    return (
      <header className='header'>
        <div className='header__wrapper'>
          <div className='header__column'>
            <Link to='/' className='header__link link'>
              <img src='/imgs/logo.png' className='header__logo' />
            </Link>
          </div>
          <div className='header__column'>
            <Search
              placeholder='Input search text'
              onChange={this.handleChange}
              value={this.state.query}
              onSearch={this.handleSubmit}
              className='header__search'
            />
          </div>
          <div className='header__column'>
            {isAuthenticated ? (
              <ul className='header__list'>
                <li>
                  <Link to='/upload' className='header__link link'>
                    Upload
                  </Link>
                </li>
                <li>
                  <Link to='/mypage' className='header__link link'>
                    Mypage
                  </Link>
                </li>
                <li>
                  <a className='header__link link' onClick={this.handleLogout}>
                    Logout
                  </a>
                </li>
              </ul>
            ) : (
              <ul className='header__list'>
                <li>
                  <Link to='/login' className='header__link link'>
                    Log In
                  </Link>
                </li>
                <li>
                  <Link to='/register' className='header__link link'>
                    Register
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </header>
    );
  }
}

export default withRouter(Header);
