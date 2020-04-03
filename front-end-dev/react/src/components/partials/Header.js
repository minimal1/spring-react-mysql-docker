/** @format */

import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Input } from "antd";

const { Search } = Input;

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: "",
    };
  }

  handleChange = (e) => {
    const {
      target: { value },
    } = e;

    this.setState({
      searchQuery: value,
    });
  };

  handleLogout = (e) => {
    this.props.onLogout();
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const query = this.state.searchQuery;
    this.props.history.push(`/result/${query}`);
  };

  render() {
    const isAuthenticated = this.props.isAuthenticated;

    return (
      <header className='header'>
        <div className='header__wrapper'>
          <div className='header__column'>
            <Link to='/' className='header__link link'>
              <img src='/imgs/icon-logo.png' className='header__logo' />
            </Link>
          </div>
          <div className='header__column'>
            <Search
              placeholder='Input search text'
              onChange={this.handleChange}
              value={this.searchQuery}
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
